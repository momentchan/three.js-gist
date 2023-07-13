const utility = /*glsl*/ `

float remap(float In, vec2 InMinMax, vec2 OutMinMax) {
    return OutMinMax.x + (In - InMinMax.x) * (OutMinMax.y - OutMinMax.x) / (InMinMax.y - InMinMax.x);
}

float smoothEdge(vec2 uv, vec2 smoothness) {
    return smoothstep(0.0, smoothness.x, uv.x) * smoothstep(1.0, 1.0 - smoothness.x, uv.x) * smoothstep(0.0, smoothness.y, uv.y) * smoothstep(1.0, 1.0 - smoothness.y, uv.y);
}

float Contrast(float In, float Contrast) {
	float midpoint = pow(0.5, 2.2);
	return (In - midpoint) * Contrast + midpoint;
}
`

export default utility