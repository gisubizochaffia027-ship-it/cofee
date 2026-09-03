/**
 * Vercel Serverless Function — proxy vers l'API Qwen (Aliyun MaaS, mode OpenAI-compatible).
 *
 * La clé d'API reste CÔTÉ SERVEUR : elle est lue depuis les variables
 * d'environnement Vercel (Settings → Environment Variables) et n'est
 * JAMAIS exposée au navigateur.
 *
 * Variables à définir sur Vercel :
 *   DASHSCOPE_API_KEY   → votre clé sk-… (ne la commitez JAMAIS dans git)
 *   DASHSCOPE_BASE_URL  → ex. https://ws-xxxx.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Méthode non autorisée — utilisez POST." });
  }

  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "DASHSCOPE_API_KEY n'est pas configurée dans Vercel." });
  }

  const baseUrl =
    process.env.DASHSCOPE_BASE_URL ||
    "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
  const { model = "qwen-plus", messages, ...rest } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Le champ `messages` (tableau) est requis." });
  }

  try {
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, ...rest }),
    });

    const data = await upstream.json().catch(() => ({}));
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: "Erreur réseau vers l'API Qwen.", detail: String(err) });
  }
}
