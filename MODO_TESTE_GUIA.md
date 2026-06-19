# 🧪 TikTok App em Modo Teste - Guia Completo

Seu app está em **modo teste**, o que significa que você não pode usar o fluxo OAuth padrão direto no navegador. Mas não se preocupe - existem várias formas de contornar isso!

## 🔴 Por que está dando erro?

```
❌ "Something went wrong"
"We couldn't log in with TikTok. This may be due to specific app settings."
```

Isso acontece porque:
- Sua app está em **Sandbox/Test Mode**
- O TikTok bloqueia redirecionamentos OAuth de apps em teste
- É uma medida de segurança do TikTok

## ✅ Soluções Disponíveis

### **Solução 1: Copiar Token Manualmente (MAIS FÁCIL)**

#### Passo 1: Acesse o Developer Dashboard
```
https://developer.tiktok.com/apps/
```

#### Passo 2: Vá para Tools → Access Token Generator
```
Dashboard
  └── Minha App
      └── Tools
          └── Access Token Generator
```

#### Passo 3: Gere o Token
- Clique em **"Generate token"**
- Selecione **"For testing your app"**
- O TikTok gera um token v1_...

#### Passo 4: Copie o Token
O token terá esse formato:
```
v1_abcdef123456789abcdef123456789abcdef12...
```

#### Passo 5: Cole na Página
1. Abra: `https://consultoriakicandi-web.github.io/urls/index_test_mode.html`
2. Na aba **"🧪 Modo Teste"**
3. Preencha:
   - Nome da Conta: seu username TikTok
   - Cole o token na textarea
4. Clique em **"💾 Salvar Token"**

**Pronto!** Seu token está salvo e pronto para publicar! ✅

---

### **Solução 2: Sair do Modo Teste (LONGO MAS PERMANENTE)**

Se quer usar o OAuth automático, precisa solicitar aprovação ao TikTok:

#### Passo 1: Prepare sua App
- Adicione todos os **Scopes** que precisa
- Configure **Redirect URIs** corretas
- Teste bem tudo

#### Passo 2: Vá para Settings → General

```
Dashboard
  └── Minha App
      └── Settings
          └── General
```

#### Passo 3: Solicite Aprovação
- Encontre "**Sandbox/Test Mode**"
- Clique em "**Request to go live**"
- Preencha o formulário com:
  - Descrição da app
  - Como será usada
  - Screenshots da interface
  - Exemplos de uso

#### Passo 4: Aguarde Aprovação
- Geralmente 3-7 dias
- TikTok enviará email quando aprovado

#### Passo 5: Ative Modo Produção
- Depois de aprovado, sua app funcionará com OAuth normal

---

### **Solução 3: Backend Seguro (MELHOR PARA PRODUÇÃO)**

Se quer integrar isso em produção, use um backend intermediário.

#### Fluxo:
```
Cliente (Frontend)
    ↓
    ├─→ Clica "Autenticar"
    ├─→ Abre OAuth do TikTok
    ├─→ TikTok redireciona com ?code=...
    ├─→ Frontend envia código para Backend
    │
Backend (Node.js / Python)
    ├─→ Recebe código
    ├─→ Troca código por token (com Client Secret protegido)
    ├─→ Armazena token com segurança
    ├─→ Retorna para frontend
    │
Cliente (Frontend)
    └─→ Usa token para publicar vídeos
```

#### Node.js Exemplo

```javascript
// servidor.js
const express = require('express');
const axios = require('axios');
const app = express();

const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
const REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI;

app.post('/api/tiktok/callback', async (req, res) => {
    const { code } = req.body;

    try {
        // Troca código por token no backend (seguro!)
        const response = await axios.post(
            'https://open.tiktokapis.com/v2/oauth/token/',
            {
                client_key: CLIENT_KEY,
                client_secret: CLIENT_SECRET,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: REDIRECT_URI
            }
        );

        const token = response.data.access_token;

        // Armazena em banco de dados
        // await salvarTokenNoBanco(token);

        // Retorna para frontend
        res.json({ access_token: token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3000);
```

#### Python Exemplo

```python
from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

CLIENT_KEY = os.getenv('TIKTOK_CLIENT_KEY')
CLIENT_SECRET = os.getenv('TIKTOK_CLIENT_SECRET')
REDIRECT_URI = os.getenv('TIKTOK_REDIRECT_URI')

@app.route('/api/tiktok/callback', methods=['POST'])
def callback():
    code = request.json.get('code')
    
    try:
        # Troca código por token
        response = requests.post(
            'https://open.tiktokapis.com/v2/oauth/token/',
            data={
                'client_key': CLIENT_KEY,
                'client_secret': CLIENT_SECRET,
                'code': code,
                'grant_type': 'authorization_code',
                'redirect_uri': REDIRECT_URI
            }
        )
        
        token = response.json()['access_token']
        
        # Armazena no banco de dados
        # salvar_token_banco(token)
        
        return jsonify({'access_token': token})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run()
```

---

## 📋 Checklist Rápido

### Para Usar Agora (Modo Teste):
- [ ] Você tem acesso ao TikTok Developer Dashboard
- [ ] Sua app está criada
- [ ] Você sabe seu Client Key e Client Secret
- [ ] Você tem um navegador (qualquer um serve)

### Para Solução 2 (Sair do Teste):
- [ ] Você tem controle total da app
- [ ] Você pode enviar documentação
- [ ] Você tem exemplos de uso
- [ ] Você pode esperar 3-7 dias

### Para Solução 3 (Backend):
- [ ] Você tem um servidor rodando
- [ ] Você pode manter Client Secret seguro
- [ ] Você quer armazenar tokens permanentemente

---

## 🎬 Guia Rápido - Começar AGORA

1. **Abra**: https://developer.tiktok.com/apps/
2. **Tools** → **Access Token Generator**
3. **Generate token** → Copie
4. **Abra**: https://consultoriakicandi-web.github.io/urls/index_test_mode.html
5. **Cola o token** → **Salvar**
6. **PRONTO!** ✅

Agora você pode publicar com `publish.html`

---

## 🚀 Próximas Etapas

Depois de salvar o token:

1. Vá para: `https://consultoriakicandi-web.github.io/urls/publish.html`
2. Selecione um vídeo MP4
3. Digite a descrição
4. Clique **"🚀 Publicar Vídeo"**

---

## ⏰ Importante

- **Token expira em 24h** - Você precisará gerar um novo amanhã
- **Cada token é válido para a conta específica**
- **O token é sensível** - Não compartilhe com ninguém

---

## 💬 Perguntas Frequentes

### P: Por quanto tempo o token é válido?
R: 24 horas. Depois precisa gerar um novo.

### P: Posso reutilizar o mesmo token?
R: Sim, enquanto não expirar.

### P: O que acontece quando expira?
R: Você precisa gerar um novo no Dashboard.

### P: Posso armazenar o token em um arquivo?
R: Sim! Depois de salvo, você pode exportar como JSON.

### P: É seguro salvar no navegador?
R: Para teste, sim. Para produção, use um backend.

### P: Quanto tempo leva para sair do modo teste?
R: Geralmente 3-7 dias úteis.

---

## 📞 Contato / Suporte

- **TikTok Docs**: https://developers.tiktok.com/doc
- **GitHub Issues**: Abra uma issue no repo
- **Email**: developer@tiktok.com

---

**Versão:** 2.0 - Modo Teste
**Data:** 2024-01-19
**Status:** ✅ Pronto para usar
