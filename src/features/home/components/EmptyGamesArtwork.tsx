import Svg, { Circle, ClipPath, Defs, Ellipse, G, LinearGradient, Path, Pattern, Stop } from "react-native-svg";

export function EmptyGamesArtwork() {
	return (
		<Svg width="100%" height={220} viewBox="0 0 260 220" accessible={false}>
			<Defs>
				<LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
					<Stop offset="0" stopColor="#27334E" />
					<Stop offset="1" stopColor="#182331" />
				</LinearGradient>
				<Pattern id="net" width="8" height="8" patternUnits="userSpaceOnUse">
					<Path d="M 8 0 H 0 V 8" fill="none" stroke="#749D8B" strokeWidth="1" />
				</Pattern>
				<LinearGradient id="ballShade" x1="0" y1="0" x2="1" y2="1">
					<Stop offset="0" stopColor="#FFFFFF" />
					<Stop offset="0.65" stopColor="#FFFFFF" />
					<Stop offset="1" stopColor="#DFE3FF" />
				</LinearGradient>
				<ClipPath id="ballClip">
					<Circle r="20" />
				</ClipPath>
				<ClipPath id="landscapeClip">
					<Circle cx="130" cy="111" r="94" />
				</ClipPath>
			</Defs>
			<G clipPath="url(#landscapeClip)">
				<Circle cx="130" cy="111" r="94" fill="url(#sky)" />
				<Path d="M27 133 Q78 109 118 140 T233 134 V205 H27Z" fill="#223A35" />
				<Path d="M28 161 Q79 145 132 165 T233 156 V205 H28Z" fill="#1D302B" />
				<Path d="M70 62 H103 L96 55 L90 58 L83 51 L77 59Z" fill="#41516C" />
				<Path d="M151 64 H192 Q189 56 182 57 Q175 46 167 57 Q156 54 151 64Z" fill="#41516C" />
				<Path d="M181 118 Q188 103 196 108 Q192 116 181 118Z" fill="#41516C" />
			</G>
			<Path
				d="M34 185 H76 L82 188 H58 L52 191 H32Z M87 188 H125 L132 191 H113 L108 194 H82Z M179 186 H214 L222 189 H202 L197 192 H177Z"
				fill="#263C34"
			/>
			<Ellipse cx="91" cy="181" rx="43" ry="2" fill="#0C1411" />
			<G fill="none" strokeLinecap="round" strokeLinejoin="round">
				<Path d="M31 181 H229" stroke="#749D8B" strokeWidth="1.5" />
				<Path
					d="M29 189 H45 M59 195 H81 M92 187 H106 M121 196 H143 M188 195 H210 M222 190 H230"
					stroke="#506C62"
					strokeWidth="1.5"
				/>
				<Path d="M49 179 L60 132 H140 L131 179Z" fill="#233D36" stroke="#A9C6B7" strokeWidth="3" />
				<Path
					d="M60 132 L70 132 L61 179 H49 M70 132 H140 L131 179 H61Z"
					fill="url(#net)"
					stroke="#A9C6B7"
					strokeWidth="2"
				/>
				<Path d="M70 132 L61 179 M140 132 L131 179" stroke="#A9C6B7" strokeWidth="3" />
			</G>
			<Ellipse cx="162" cy="190" rx="21" ry="2.5" fill="#0C1411" />
			<G transform="translate(162 170)">
				<Circle r="20" fill="url(#ballShade)" />
				<G
					clipPath="url(#ballClip)"
					transform="rotate(14)"
					stroke="#3526EF"
					strokeWidth="0.85"
					strokeLinejoin="round"
				>
					<Path d="M0 -7 L6.66 -2.16 L4.11 5.66 L-4.11 5.66 L-6.66 -2.16Z" fill="#3526EF" />
					{[0, 72, 144, 216, 288].map((angle) => (
						<G key={angle} transform={`rotate(${angle})`}>
							<Path d="M0 -13 L5 -16 L4 -22 L-4 -22 L-5 -16Z" fill="#3526EF" />
							<Path d="M0 -7 L0 -13 M5 -16 L11.76 -16.18 M-5 -16 L-11.76 -16.18" fill="none" />
						</G>
					))}
				</G>
				<Circle r="20" fill="none" stroke="#3526EF" strokeWidth="0.9" />
			</G>
		</Svg>
	);
}
