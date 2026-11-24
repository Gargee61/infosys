import React, { useEffect, useRef } from 'react';

const GLSLDemo = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl');

        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

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

            void main() {
                vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
                
                float finalColor = 0.0;
                
                for(float i = 0.0; i < 3.0; i++) {
                    uv = fract(uv * 1.5) - 0.5;
                    
                    float d = length(uv) * exp(-length(uv));
                    
                    vec3 col = vec3(0.0, 0.86, 1.0); // Cyan
                    vec3 col2 = vec3(0.61, 0.0, 1.0); // Purple
                    
                    vec3 palette = mix(col, col2, sin(time * 0.5) * 0.5 + 0.5);
                    
                    d = sin(d * 8.0 + time) / 8.0;
                    d = abs(d);
                    d = pow(0.01 / d, 1.2);
                    
                    finalColor += d;
                }
                
                vec3 finalRGB = mix(vec3(0.0, 0.86, 1.0), vec3(0.61, 0.0, 1.0), sin(time * 0.2) * 0.5 + 0.5);
                gl_FragColor = vec4(finalRGB * finalColor, 1.0);
            }
        `;

        const createShader = (gl, type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
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
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ display: 'block' }} />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#fff',
                textAlign: 'center',
                fontFamily: 'Outfit, sans-serif',
                pointerEvents: 'none',
                textShadow: '0 0 20px rgba(0, 219, 255, 0.8)'
            }}>
                <h1 style={{ fontSize: '4rem', fontWeight: '800', margin: '0' }}>ENERGY FLOW</h1>
                <p style={{ fontSize: '1.2rem', opacity: '0.8', letterSpacing: '2px' }}>NEURAL OPTIMIZATION ENGINE v4.0</p>
            </div>
        </div>
    );
};

export default GLSLDemo;
