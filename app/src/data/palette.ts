/** From /workspace/game/palette.md — do not invent hex values. */
export const Palette = {
  void: 0x0a0a12,
  asphalt: 0x16161f,
  outline: 0x2e2e38,
  rust: 0xa85a32,
  neonMagenta: 0xff2bd6,
  neonCyan: 0x00e5ff,
  uv: 0xeaf6c8,
  blood: 0x9b1b3a,
  vampPale: 0xc8ccd8,
  vampVein: 0x8b6bff,
  ghoul: 0x6a7a48,
  wolfFur: 0x3a3028,
  rex: 0xe8a030,
  nova: 0xff7a18,
  silas: 0x5c8a4a,
  vesper: 0xc41e4a,
} as const;

export type HunterId = 'rex' | 'nova' | 'silas' | 'vesper';

export const Hunters: Record<
  HunterId,
  { id: HunterId; name: string; color: number; speed: number }
> = {
  rex: { id: 'rex', name: 'Rex Bulwark', color: Palette.rex, speed: 140 },
  nova: { id: 'nova', name: 'Nova Flicker', color: Palette.nova, speed: 200 },
  silas: { id: 'silas', name: 'Silas Fang', color: Palette.silas, speed: 170 },
  vesper: { id: 'vesper', name: 'Vesper Crimson', color: Palette.vesper, speed: 160 },
};
