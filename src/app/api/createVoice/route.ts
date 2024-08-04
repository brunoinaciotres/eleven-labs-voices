import axios from 'axios'

export async function POST(req: Request) {

    try {
        const { text, voiceId } = await req.json()


        const res = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                text: text,
                model_id: "eleven_multilingual_v2",
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Accept": "audio/mpeg",
                "xi-api-key": process.env.NEXT_PUBLIC_API_KEY
            },
            responseType:'arraybuffer'
        }
        )
       

        return new Response(res.data, {
            status: 200,
            headers: {
                'Content-Type': 'audio/mpeg',
                'Access-Control-Allow-Origin': '*',
            }
        })

    } catch (e) {
        console.log(e)
        return new Response("Erro ao criar voz. Erro: " + e)
    }
}