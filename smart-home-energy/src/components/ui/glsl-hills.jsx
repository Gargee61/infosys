import React, { useEffect, useRef } from 'react';

export const GLSLHills = ({ speed = 0.5 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl');

        if (!gl) return;

        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision highp float;
            uniform float time;
            uniform vec2 resolution;

            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
            }

            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), f.x),
                           mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
            }

            float fbm(vec2 p) {
                float v = 0.0;
                float a = 0.5;
                for (int i = 0; i < 5; i++) {
                    v += a * noise(p);
                    p *= 2.0;
                    a *= 0.5;
                }
                return v;
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / resolution.xy;
                uv.y = 1.0 - uv.y;
                
                float t = time * ${speed.toFixed(2)};
                
                // Create rolling hills effect
                float h = fbm(vec2(uv.x * 2.0 + t, t * 0.1)) * 0.5 + 0.2;
                float h2 = fbm(vec2(uv.x * 1.5 - t * 0.8, t * 0.05)) * 0.3 + 0.1;
                
                vec3 cyan = vec3(0.0, 0.86, 1.0);
                vec3 purple = vec3(0.61, 0.0, 1.0);
                vec3 bg = vec3(0.02, 0.03, 0.05);

                vec3 color = bg;

                // First layer of hills (Back)
                if (uv.y > 1.0 - h) {
                    color = mix(bg, purple * 0.3, (uv.y - (1.0 - h)) * 2.0);
                }

                // Second layer of hills (Front)
                if (uv.y > 1.0 - h2) {
                    color = mix(color, cyan * 0.4, (uv.y - (1.0 - h2)) * 3.0);
                }

                // Add some scanlines and glow
                float scanline = sin(uv.y * 800.0) * 0.04;
                color += scanline;
                
                // Vignette
                float vignette = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y) * 15.0;
                color *= pow(vignette, 0.1);

                gl_FragColor = vec4(color, 0.15); // Low alpha to let bg-glows through
            }
        `;

        const createShader = (gl, type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const program = gl.createProgram();
        gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShaderSource));
        gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const timeLocation = gl.getUniformLocation(program, 'time');
        const resolutionLocation = gl.getUniformLocation(program, 'resolution');

        const render = (time) => {
            gl.uniform1f(timeLocation, time * 0.001);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        window.addEventListener('resize', resize);
        resize();
        requestAnimationFrame(render);

        return () => window.removeEventListener('resize', resize);
    }, [speed]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
};
