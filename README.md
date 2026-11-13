<img width="500" height="1500" alt="celuriro" src="https://github.com/user-attachments/assets/055c98f8-21c9-4dd9-8712-83ff3db2c678" />
<div align="center">

# 📚 EduDesk
### Organizador de Trabalhos Escolares e Notas Acadêmicas

![EduDesk Banner](https://img.shields.io/badge/EduDesk-Organizador%20Escolar-1565C0?style=for-the-badge&logo=graduation-cap&logoColor=white)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Capacitor](https://img.shields.io/badge/Capacitor-6-119EFF?style=flat-square&logo=capacitor)](https://capacitorjs.com)
[![Android](https://img.shields.io/badge/Android-APK-3DDC84?style=flat-square&logo=android)](https://developer.android.com)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=github-actions)](https://github.com/features/actions)

**App mobile para estudantes organizarem trabalhos, notas e prazos escolares.**

[✨ Funcionalidades](#-funcionalidades) • [🚀 Instalação](#-instalação) • [📱 Build Android](#-build-android) • [🎨 Identidade Visual](#-identidade-visual) • [🔧 CI/CD](#-cicd)

</div>

---

## 📖 Sobre o Projeto

O **EduDesk** é um aplicativo mobile desenvolvido com **React + Capacitor** para ajudar estudantes a organizarem seus trabalhos escolares, controlar notas acadêmicas e acompanhar prazos de entrega de forma visual e intuitiva.

Este projeto foi desenvolvido como atividade da **Aula 16**, focando em:
- 🎨 **Identidade Visual (Branding)** nativa para Android
- ⚙️ **Automatização** de geração de assets com `@capacitor/assets`
- 🤖 **CI/CD** com GitHub Actions para build automático da APK

---

## ✨ Funcionalidades

### 🏠 Dashboard
- Visão geral com saudação personalizada por horário
- Cards de estatísticas: trabalhos pendentes, entregues e média geral
- Lista dos **próximos prazos urgentes** com indicador de dias restantes
- Alertas visuais para trabalhos atrasados ou com prazo hoje

### 📝 Gerenciamento de Trabalhos
- **Cadastro completo**: título, disciplina, tipo, prazo, prioridade e status
- **Status progressivo**: Pendente → Em Andamento → Entregue (toque para mudar)
- **Filtros**: por status (todos, pendentes, em andamento, entregues)
- **Busca** por título ou disciplina
- Ordenação automática por prazo
- Indicadores de prioridade (🔴 Alta / 🟡 Média / 🟢 Baixa)

### 📊 Notas Acadêmicas
- Registro de notas por disciplina, tipo de avaliação e período (bimestres/semestres)
- **Cálculo automático de médias** por disciplina com barra de progresso visual
- **Média geral** em destaque com total de avaliações
- Classificação por desempenho: Excelente / Bom / Regular / Atenção
- Filtros por disciplina e período letivo
- Histórico completo de todas as avaliações

### 📅 Calendário
- Visualização mensal com marcadores de prazos
- Lista de todos os prazos do mês atual
- Destaque visual para o dia de hoje
- Indicadores coloridos por status do trabalho

---

## 🎨 Identidade Visual

### Paleta de Cores
| Cor | HEX | Uso |
|-----|-----|-----|
| 🔵 Azul Principal | `#1565C0` | Header, botões primários, ícone |
| 🔵 Azul Claro | `#1976D2` | Gradientes, hover |
| 🌙 Azul Escuro | `#0D47A1` | Bordas, sombras |
| 🟡 Amarelo Accent | `#FFC107` | Destaques, badges |
| 🟢 Verde | `#2E7D32` | Status "entregue", notas altas |
| 🔴 Vermelho | `#C62828` | Status "atrasado", notas baixas |
| ⚪ Fundo | `#F5F7FA` | Background do app |

### Assets Nativos Android
```
assets/
├── icon.png      # 1024×1024px — Ícone base (fundo sólido #1565C0)
└── splash.png    # 2732×2732px — Splash screen (logo na safe zone central)
```

#### Especificações das Safe Zones
| Asset | Dimensão Total | Safe Zone | Área do Logo |
|-------|---------------|-----------|--------------|
| `icon.png` | 1024×1024px | 768×768px (centro) | Logo não deve ultrapassar os 75% |
| `splash.png` | 2732×2732px | ~1366×1366px (centro) | Mantido dentro dos 50% centrais |

### Densidades Geradas pelo `@capacitor/assets`
| Densidade | DPI | Multiplicador | Ícone Launcher |
|-----------|-----|---------------|----------------|
| `mdpi` | 160dpi | 1× | 48×48px |
| `hdpi` | 240dpi | 1.5× | 72×72px |
| `xhdpi` | 320dpi | 2× | 96×96px |
| `xxhdpi` | 480dpi | 3× | 144×144px |
| `xxxhdpi` | 640dpi | 4× | 192×192px |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|------------|--------|--------|
| [React](https://react.dev) | 18 | Framework UI |
| [Vite](https://vitejs.dev) | 5 | Build tool e dev server |
| [Capacitor](https://capacitorjs.com) | 6 | Bridge web → nativo |
| [@capacitor/android](https://capacitorjs.com/docs/android) | 6 | Plataforma Android |
| [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) | 3 | Geração de assets nativos |
| [GitHub Actions](https://github.com/features/actions) | - | CI/CD automático |

---

## 🚀 Instalação

### Pré-requisitos
- **Node.js** 18+ ([download](https://nodejs.org))
- **npm** 9+
- **Android Studio** (para rodar em dispositivo/emulador)
- **Java JDK 17** ([download](https://adoptium.net))

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/edudesk.git
cd edudesk

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento (web)
npm run dev

# 4. Build de produção
npm run build

# 5. Sincronize com Android
npx cap sync android

# 6. Abra no Android Studio
npx cap open android
```

---

## 📱 Build Android

### Opção 1: Build Local

```bash
# 1. Build do React
npm run build

# 2. Gerar assets nativos (ícones e splash em todas as densidades)
npx capacitor-assets generate --android

# 3. Sincronizar com o Android
npx cap sync android

# 4. Build da APK via Gradle
cd android
./gradlew assembleDebug

# A APK estará em:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Opção 2: Build Automático na Nuvem (GitHub Actions)

Faça um `git push` para a branch `main` ou `master` e a APK será gerada automaticamente!

```bash
git add .
git commit -m "feat: adicionar identidade visual e CI/CD"
git push origin main
```

Acesse a aba **Actions** do seu repositório no GitHub e aguarde o workflow concluir. O artefato **`meu-aplicativo-apk`** estará disponível para download.

### Instalar APK no Dispositivo

```bash
# Via ADB (com dispositivo conectado via USB)
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

> ⚠️ **Atenção:** Habilite "Fontes desconhecidas" ou "Instalar apps desconhecidos" nas configurações do Android para instalar APKs fora da Play Store.

---

## 🔧 CI/CD

O pipeline de CI/CD está configurado em `.github/workflows/android-build.yml` e executa automaticamente em todo push para `main`/`master`.

### Fluxo do Pipeline

```
Push para main/master
        ↓
📥 Checkout do código
        ↓
☕ Setup Java 21 (Temurin)
        ↓
🟢 Setup Node.js 22
        ↓
📦 npm ci (instalar dependências)
        ↓
🏗️ npm run build (Vite)
        ↓
🔄 npx cap sync android
        ↓
🤖 Setup Android SDK
        ↓
🏭 ./gradlew assembleDebug
        ↓
📤 Upload Artefato "meu-aplicativo-apk"
```

### Verificar o Build
1. Acesse seu repositório no GitHub
2. Clique na aba **Actions**
3. Selecione o workflow mais recente
4. Aguarde o status ✅ verde
5. Em **Artifacts**, baixe o **`meu-aplicativo-apk`**

---

## 📁 Estrutura do Projeto

```
edudesk/
├── .github/
│   └── workflows/
│       └── android-build.yml     # CI/CD GitHub Actions
├── android/                       # Projeto Android nativo (Capacitor)
│   ├── app/
│   │   └── src/main/res/         # Assets gerados automaticamente
│   │       ├── drawable-mdpi/
│   │       ├── drawable-hdpi/
│   │       ├── drawable-xhdpi/
│   │       ├── drawable-xxhdpi/
│   │       └── drawable-xxxhdpi/
│   └── gradlew
├── assets/                        # Imagens base para geração
│   ├── icon.png                   # 1024×1024px — Ícone base
│   └── splash.png                 # 2732×2732px — Splash Screen base
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Cabeçalho com gradiente azul
│   │   └── BottomNav.jsx          # Navegação inferior por tabs
│   ├── hooks/
│   │   └── useLocalStorage.js     # Hook para persistência local
│   ├── pages/
│   │   ├── DashboardPage.jsx      # Tela inicial com resumo
│   │   ├── TrabalhoPage.jsx       # Gerenciamento de trabalhos
│   │   ├── NotasPage.jsx          # Registro e médias de notas
│   │   └── CalendarioPage.jsx     # Calendário mensal
│   ├── App.jsx                    # Componente raiz + roteamento
│   └── index.css                  # Estilos globais e design system
├── capacitor.config.ts            # Configuração do Capacitor + SplashScreen
├── vite.config.js                 # Configuração do Vite
├── package.json
└── README.md
```

---

## ⚙️ Configuração do Capacitor

Arquivo `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.escola.edudesk',
  appName: 'EduDesk',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#1565C0',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
```

---

## 🗄️ Armazenamento de Dados

O app utiliza **`localStorage`** do navegador (via WebView) para persistir dados localmente no dispositivo, sem necessidade de servidor ou banco de dados externo.

| Chave | Tipo | Descrição |
|-------|------|-----------|
| `trabalhos` | `Array<Trabalho>` | Lista de trabalhos escolares |
| `notas` | `Array<Nota>` | Registros de notas/avaliações |

### Tipos de Dados

```typescript
interface Trabalho {
  id: string;           // timestamp
  titulo: string;       // Nome do trabalho
  disciplina: string;   // Ex: "Matemática"
  tipo: string;         // "Trabalho" | "Prova" | "Seminário" ...
  prazo: string;        // ISO date string "YYYY-MM-DD"
  descricao: string;    // Observações
  status: 'pendente' | 'em-andamento' | 'entregue';
  prioridade: 'alta' | 'media' | 'baixa';
}

interface Nota {
  id: string;           // timestamp
  disciplina: string;   // Ex: "Física"
  tipo: string;         // "Prova" | "Trabalho" | "Simulado" ...
  nota: string;         // Valor 0-10
  periodo: string;      // "1º Bimestre" | "2º Semestre" ...
  observacao: string;   // Comentários
}
```

---

## 📸 Screenshots

| Dashboard | Trabalhos | Notas | Calendário |
|-----------|-----------|-------|------------|
| Visão geral com stats | Gerenciar trabalhos | Médias por disciplina | Prazos no mês |

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m 'feat: adicionar minha feature'`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">

Feito com ❤️ para estudantes brasileiros 🇧🇷

**EduDesk** — _Organize seus estudos, conquiste seu futuro!_

</div>
