/**
 * 🐱 3D Motion Cat Mascot Canvas Renderer
 * Impeccable UI Interactive Cyber-Cat Element with particle aura and rotation.
 */
export class MotionCatMascot3D {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animId: number = 0;
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) throw new Error(`Container ${containerId} not found`);

    this.canvas = document.createElement('canvas');
    this.canvas.width = 240;
    this.canvas.height = 240;
    this.canvas.style.cursor = 'pointer';
    container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d')!;
    this.bindEvents();
    this.animate();
  }

  private bindEvents() {
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = (e.clientX - rect.left - rect.width / 2) / 10;
      this.mouseY = (e.clientY - rect.top - rect.height / 2) / 10;
    });
  }

  private animate = () => {
    const ctx = this.ctx;
    const time = Date.now() * 0.003;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const centerX = 120 + Math.sin(time) * 4;
    const centerY = 120 + Math.cos(time * 1.2) * 4;

    // 1. Hologram Motion Glow Aura
    const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 90);
    gradient.addColorStop(0, 'rgba(0, 255, 157, 0.35)');
    gradient.addColorStop(0.5, 'rgba(181, 95, 230, 0.2)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
    ctx.fill();

    // 2. 3D Floating Cat Head Base
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.mouseX * 0.02);

    // Ears (Left & Right 3D Poly)
    ctx.fillStyle = '#161d2d';
    ctx.strokeStyle = '#00ff9d';
    ctx.lineWidth = 2.5;

    // Left Ear
    ctx.beginPath();
    ctx.moveTo(-45, -20);
    ctx.lineTo(-65, -75);
    ctx.lineTo(-15, -45);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right Ear
    ctx.beginPath();
    ctx.moveTo(45, -20);
    ctx.lineTo(65, -75);
    ctx.lineTo(15, -45);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Head Polygon
    ctx.beginPath();
    ctx.arc(0, 0, 55, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#b55fe6';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 3. Cyber Glasses Frame (Script Kitty Signature Look)
    ctx.strokeStyle = '#00ff9d';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-22, -8, 16, 0, Math.PI * 2);
    ctx.arc(22, -8, 16, 0, Math.PI * 2);
    ctx.moveTo(-6, -8);
    ctx.lineTo(6, -8);
    ctx.stroke();

    // Glowing Cyber Eyes (Glowing Green)
    ctx.fillStyle = '#00ff9d';
    ctx.shadowColor = '#00ff9d';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(-22 + this.mouseX * 0.2, -8 + this.mouseY * 0.2, 5, 0, Math.PI * 2);
    ctx.arc(22 + this.mouseX * 0.2, -8 + this.mouseY * 0.2, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow

    // Cute Cat Nose & Whiskers
    ctx.fillStyle = '#b55fe6';
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(-6, 4);
    ctx.lineTo(6, 4);
    ctx.closePath();
    ctx.fill();

    // Whiskers
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // Left Whiskers
    ctx.moveTo(-25, 12); ctx.lineTo(-55, 5);
    ctx.moveTo(-25, 18); ctx.lineTo(-55, 22);
    // Right Whiskers
    ctx.moveTo(25, 12); ctx.lineTo(55, 5);
    ctx.moveTo(25, 18); ctx.lineTo(55, 22);
    ctx.stroke();

    ctx.restore();

    this.animId = requestAnimationFrame(this.animate);
  };

  public destroy() {
    cancelAnimationFrame(this.animId);
  }
}
