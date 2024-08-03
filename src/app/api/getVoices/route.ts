import axios from 'axios'

export async function GET() {

        try {
                const res = await axios.get('https://api.elevenlabs.io/v1/voices')
                const data = res.data
             
                return new Response(JSON.stringify(data.voices))

        }catch (e) {
                console.log(e)
                return new Response("Erro ao buscar vozes. Erro: " + e)
        }

}