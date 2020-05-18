require('dotenv').config()

const axios = require('axios')

// $ curl -X POST -u "dev:<your API key here>" -H "Content-Type: application/json" -d " { \"model\": { \"frames\": [ { \"icon\":\"a2867\", \"text\":\"Hello\!\"} ] } }" https://<ip address>:4343/api/v2/device/notifications --insecure

async function run() {
  const instance = axios.create({
    baseURL: `http://${process.env.LAMETRIC_CLOCK_IP_ADDRESS}:8080/api/v2`,
    auth: {
      username: 'dev',
      password: process.env.LAMETRIC_DEVICE_API_KEY
    },
    headers: { 'Content-Type': 'application/json' }
  });

  const result = await instance.post('/device/notifications',
    {
      "model": {
        "frames": [
          {
            "icon": 2867,
            "text": "Hello!"
          },
          {
            "icon": 120,
            "goalData": {
              "start": 0,
              "current": 50,
              "end": 100,
              "unit": "%"
            }
          },
          {
            "chartData": [1, 2, 3, 4, 5, 6, 7]
          }
        ],

        "sound": {
          "category": "notifications",
          "id": "win2",
          "repeat": 1
        }
      }
    }
  )

  console.log(result.data)

}

run()
