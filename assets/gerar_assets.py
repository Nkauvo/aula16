try:
    from PIL import Image, ImageDraw, ImageFont
    import os

    assets_dir = r"C:\Users\Aluno\Desktop\eduDesk\assets"
    os.makedirs(assets_dir, exist_ok=True)

    # ============================================================
    # ICON.PNG - 1024x1024 fundo sólido azul, logo centralizado
    # ============================================================
    icon_size = 1024
    img_icon = Image.new("RGBA", (icon_size, icon_size), "#1565C0")
    draw = ImageDraw.Draw(img_icon)

    # Círculo branco central grande
    margin = 120
    draw.ellipse([margin, margin, icon_size-margin, icon_size-margin], fill="#FFFFFF")

    # Emoji de livro — desenhado manualmente com retângulos
    cx, cy = icon_size // 2, icon_size // 2

    # Livro: corpo
    bw, bh = 300, 380
    bx, by = cx - bw//2, cy - bh//2
    draw.rectangle([bx, by, bx+bw, by+bh], fill="#1565C0", outline="#0D47A1", width=6)

    # Lombada do livro (esquerda)
    draw.rectangle([bx, by, bx+40, by+bh], fill="#0D47A1")

    # Linhas do texto no livro
    for i, pct in enumerate([0.3, 0.42, 0.54, 0.66]):
        ly = by + int(bh * pct)
        lx1 = bx + 60
        lx2 = bx + bw - 30
        line_w = int((lx2 - lx1) * (0.9 if i == 0 else 0.7))
        draw.rectangle([lx1, ly, lx1 + line_w, ly + 14], fill="#FFFFFF")

    # Cantos do livro (estrela/marcador no topo)
    draw.rectangle([bx + 60, by + 30, bx + bw - 30, by + 70], fill="#FFC107")

    # Salvar
    icon_path = os.path.join(assets_dir, "icon.png")
    img_icon.save(icon_path, "PNG")
    print(f"✅ icon.png salvo: {icon_path}")

    # ============================================================
    # SPLASH.PNG - 2732x2732 splash screen
    # ============================================================
    splash_size = 2732
    img_splash = Image.new("RGBA", (splash_size, splash_size), "#1565C0")
    draw_s = ImageDraw.Draw(img_splash)

    # Fundo com gradiente visual (círculo decorativo)
    # Círculo grande decorativo (canto inferior)
    draw_s.ellipse([-300, splash_size//2, splash_size//2, splash_size+300], fill="#0D47A1")

    # Safe zone: 192px em todos os lados (logo deve ficar dentro de ~700x700 no centro)
    # Centro da splash
    scx, scy = splash_size // 2, splash_size // 2

    # Ícone do livro centralizado (maior)
    icon_r = 320
    draw_s.ellipse([scx-icon_r, scy-icon_r-120, scx+icon_r, scy+icon_r-120], fill="#FFFFFF")

    # Livro dentro do círculo
    bw2, bh2 = 290, 360
    bx2, by2 = scx - bw2//2, scy - bh2//2 - 120
    draw_s.rectangle([bx2, by2, bx2+bw2, by2+bh2], fill="#1565C0", outline="#0D47A1", width=5)
    draw_s.rectangle([bx2, by2, bx2+36, by2+bh2], fill="#0D47A1")
    for i, pct in enumerate([0.3, 0.42, 0.54, 0.66]):
        ly2 = by2 + int(bh2 * pct)
        lx1_2 = bx2 + 55
        lx2_2 = bx2 + bw2 - 25
        line_w2 = int((lx2_2 - lx1_2) * (0.9 if i == 0 else 0.7))
        draw_s.rectangle([lx1_2, ly2, lx1_2 + line_w2, ly2 + 12], fill="#FFFFFF")
    draw_s.rectangle([bx2+55, by2+28, bx2+bw2-25, by2+65], fill="#FFC107")

    # Texto "EduDesk" abaixo do ícone
    try:
        font_title = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 160)
        font_sub = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 80)
    except:
        font_title = ImageFont.load_default()
        font_sub = font_title

    text_title = "EduDesk"
    text_sub = "Organizador Escolar"

    # Título
    bbox_t = draw_s.textbbox((0, 0), text_title, font=font_title)
    tw = bbox_t[2] - bbox_t[0]
    draw_s.text((scx - tw//2, scy + icon_r - 60), text_title, fill="#FFFFFF", font=font_title)

    # Subtítulo
    bbox_s = draw_s.textbbox((0, 0), text_sub, font=font_sub)
    sw = bbox_s[2] - bbox_s[0]
    draw_s.text((scx - sw//2, scy + icon_r + 120), text_sub, fill="#FFC107", font=font_sub)

    splash_path = os.path.join(assets_dir, "splash.png")
    img_splash.save(splash_path, "PNG")
    print(f"✅ splash.png salvo: {splash_path}")

    print("\n🎉 Assets gerados com sucesso!")
    print(f"   icon.png  - {icon_size}x{icon_size}px")
    print(f"   splash.png - {splash_size}x{splash_size}px")

except ImportError:
    print("Pillow não encontrado. Instalando...")
    import subprocess
    subprocess.run(["pip", "install", "Pillow"], check=True)
    print("Pillow instalado! Execute o script novamente.")
