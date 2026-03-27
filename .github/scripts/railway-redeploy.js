const TOKEN = process.argv.slice(2)[0];
const ENVIRONMENT_ID = "ced369f7-c8b5-4091-a58b-4f04571032b5"
const SERVICE_ID = "6fbe7651-ddbf-4f87-9f65-71f9293bcb1a"

const resp = await fetch('https://backboard.railway.com/graphql/v2', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${TOKEN}`,
  },
  body: JSON.stringify({
    query: `
      mutation ServiceInstanceRedeploy {
          serviceInstanceRedeploy(
              environmentId: "${ENVIRONMENT_ID}"
              serviceId: "${SERVICE_ID}"
          )
      }`
  }),
})

const data = await resp.json()

if (data.errors) {
  console.error(data.errors)
  throw new Error('Failed to redeploy service')
}

console.log(data)
