"use client";

import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER = `attribute vec2 p; void main(){gl_Position=vec4(p,0,1);}`;

/**
 * Fragment shader for procedural marble texture.
 * Uses mediump precision for Safari mobile compatibility with highp fallback.
 */
const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 R;
uniform float T;

vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 perm(vec4 x){return mod289(((x*34.0)+1.0)*x);}

float noise(vec3 p){
    vec3 a=floor(p);
    vec3 d=p-a;
    d=d*d*(3.0-2.0*d);
    vec4 b=a.xxyy+vec4(0.0,1.0,0.0,1.0);
    vec4 k1=perm(b.xyxy);
    vec4 k2=perm(k1.xyxy+b.zzww);
    vec4 c=k2+a.zzzz;
    vec4 k3=perm(c);
    vec4 k4=perm(c+1.0);
    vec4 o1=fract(k3*(1.0/41.0));
    vec4 o2=fract(k4*(1.0/41.0));
    vec4 o3=o2*d.z+o1*(1.0-d.z);
    vec2 o4=o3.yw*d.x+o3.xz*(1.0-d.x);
    return o4.y*d.y+o4.x*(1.0-d.y);
}

float fbm(vec3 p){
    float v=0.0;
    float a=0.5;
    vec3 shift=vec3(100.0);
    for(int i=0;i<4;i++){
        v+=a*noise(p);
        p=p*2.0+shift;
        a*=0.5;
    }
    return v;
}

void main(){
    vec2 uv=gl_FragCoord.xy/R;
    float asp=R.x/R.y;
    vec2 p=vec2(uv.x*asp, uv.y)*1.2;
    float t=T*0.035;
    float n1=fbm(vec3(p*0.8, t*0.5));
    float n2=fbm(vec3(p*0.8+vec2(5.2,1.3), t*0.4));
    vec2 q=vec2(n1, n2);
    float n3=fbm(vec3(p+6.0*q+vec2(1.7,9.2), t*0.3));
    float n4=fbm(vec3(p+6.0*q+vec2(8.3,2.8), t*0.35));
    vec2 r=vec2(n3, n4);
    float n5=fbm(vec3(p+5.0*r+vec2(3.1,7.7), t*0.2));
    float n6=fbm(vec3(p+5.0*r+vec2(6.4,4.1), t*0.25));
    vec2 s=vec2(n5, n6);
    float f=fbm(vec3(p+6.0*s, t*0.15));
    float f2=fbm(vec3(p*0.6+4.0*r+vec2(11.3,3.7), t*0.18));
    float marble=f*0.65+f2*0.35;
    marble=marble*1.6-0.35;
    marble=clamp(marble, 0.0, 1.0);
    marble=smoothstep(0.0, 1.0, marble);
    marble=smoothstep(0.08, 0.92, marble);
    marble=smoothstep(0.05, 0.95, marble);
    float v=marble;
    vec3 color;
    float blackPoint=0.015;
    float whitePoint=0.55;
    if(v<0.15){
        color=mix(vec3(blackPoint), vec3(0.04,0.038,0.036), v/0.15);
    } else if(v<0.35){
        color=mix(vec3(0.04,0.038,0.036), vec3(0.13,0.125,0.12), (v-0.15)/0.2);
    } else if(v<0.55){
        color=mix(vec3(0.13,0.125,0.12), vec3(0.28,0.27,0.26), (v-0.35)/0.2);
    } else if(v<0.75){
        color=mix(vec3(0.28,0.27,0.26), vec3(0.42,0.40,0.38), (v-0.55)/0.2);
    } else {
        color=mix(vec3(0.42,0.40,0.38), vec3(whitePoint,whitePoint*0.98,whitePoint*0.95), (v-0.75)/0.25);
    }
    // Center vignette — darken edges, keep center slightly brighter
    vec2 vc=uv-0.5;
    float vign=1.0-dot(vc,vc)*1.8;
    vign=clamp(vign,0.0,1.0);
    vign=smoothstep(0.0,1.0,vign);
    color*=mix(0.5,1.0,vign);
    gl_FragColor=vec4(color,1.0);
}
`;

/**
 * Animated WebGL marble background with CSS gradient fallback for unsupported browsers.
 *
 * @param className - Tailwind classes for positioning.
 */
export default function MarbleBackground({ className = "fixed top-0 left-0 w-full z-0" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false });
    if (!gl) {
      setWebglFailed(true);
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const scale = isMobile ? 0.4 * dpr : 0.5;

    let lastWidth = 0;

    function resize() {
      if (!canvas || !gl) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      // On mobile, ignore height-only changes (iOS Safari URL bar collapse)
      if (isMobile && lastWidth === w && canvas.width > 0) return;
      lastWidth = w;
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener("resize", resize);
    resize();

    function makeShader(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl!.getShaderInfoLog(s));
        return null;
      }
      return s;
    }

    const vs = makeShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = makeShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) {
      setWebglFailed(true);
      return;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      setWebglFailed(true);
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aP = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, "R");
    const uT = gl.getUniformLocation(prog, "T");
    const t0 = Date.now();
    let animId: number;
    let lastFrame = 0;
    let visible = true;
    let contextLost = false;
    const FRAME_INTERVAL = 1000 / (isMobile ? 20 : 20);

    // Pause rendering when canvas is off screen
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(canvas);

    // Handle WebGL context loss (Safari tab switch, low memory)
    function onContextLost(e: Event) {
      e.preventDefault();
      contextLost = true;
      cancelAnimationFrame(animId);
    }
    function onContextRestored() {
      contextLost = false;
      animId = requestAnimationFrame(render);
    }
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    function render(now: number) {
      animId = requestAnimationFrame(render);
      if (!visible || contextLost || now - lastFrame < FRAME_INTERVAL) return;
      lastFrame = now;
      const t = (Date.now() - t0) / 1000;
      gl!.uniform2f(uR, canvas!.width, canvas!.height);
      gl!.uniform1f(uT, t);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      cancelAnimationFrame(animId);
      io.disconnect();
    };
  }, []);

  // CSS gradient fallback when WebGL is unavailable or shader fails
  if (webglFailed) {
    return (
      <div
        className={className}
        style={{
          background: "radial-gradient(ellipse at 30% 40%, #2a2725 0%, #1a1917 30%, #111010 60%, #0a0a09 100%)",
          height: "100dvh",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ imageRendering: "auto", height: "100dvh" }}
    />
  );
}
