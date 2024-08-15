import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Dblocked-frame',
})

let pollingOptions = [
  {
    value : "Rollups and Layer 2s",
    optionTag : "A",
    voteCount : 0
  },
  {
    value : "Account Abstraction",
    optionTag : "B",
    voteCount : 0
  }
]

let userFid:any = []
let voted:any = []

app.frame('/', (c) => {
  const { buttonValue, inputText, status, frameData } = c

  const newOption:any = {
    value: inputText,
    optionTag: String.fromCharCode(pollingOptions[pollingOptions.length - 1].optionTag.charCodeAt(0) + 1),
    voteCount: 1
  }
  if (buttonValue == "Nothing" && inputText !== undefined && pollingOptions.length < 3) {
    pollingOptions.push(newOption)
    voted.push({userVoted: inputText, fid: frameData?.fid})
  } else if(inputText == undefined && buttonValue == "Nothing") {
      return c.res({
        image: (
          <div
            style={{
              alignItems: 'center',
              background: 'black',
              backgroundSize: '100% 100%',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              height: '100%',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: 40,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                marginTop: 30,
                padding: '0 120px',
                whiteSpace: 'pre-wrap',
                display: 'flex',
                flexDirection : 'column',
              }}
            >
              <h2>
                No Topic Given
              </h2>
            </div>
          </div>
        ),
        intents: [
          <Button.Reset>Try Again</Button.Reset>,
        ],
      }) 
  }

  if (status === 'response') {
    if(userFid.includes(frameData?.fid)) {
      return c.res({
        image: (
          <div
          style={{
            alignItems: 'center',
            background: 'black',
              backgroundSize: '100% 100%',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              height: '100%',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
            }}
            >
            <div
              style={{
                color: 'white',
                fontSize: 40,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                marginTop: 30,
                padding: '0 120px',
                whiteSpace: 'pre-wrap',
                display: 'flex',
                flexDirection : 'column',
              }}
              >
              <h2>
                You've already Voted for - {"\n"}
                {
                  voted.map((_vote: any) => {
                    if(_vote.fid == frameData?.fid) {
                      console.log(_vote.userVoted)
                      return _vote.userVoted
                    }
                  } )
                }
              </h2>
              <ul style={{display : 'flex', flexDirection: 'column'}}>
              {
                pollingOptions.map(_pollingOption => {
                  console.log(_pollingOption.voteCount)
                  return(
                    <li key={_pollingOption.optionTag}>
                      {_pollingOption.optionTag} : {_pollingOption.value} - {_pollingOption.voteCount}
                    </li>
                  )
                })
              }
            </ul>
            </div>
          </div>
        ),
        intents: [
          <Button.Reset>Go back</Button.Reset>,
        ],
      })
    }
    userFid.push(frameData?.fid)
    pollingOptions = pollingOptions.map(_pollingOptions => {
      if (_pollingOptions.value === buttonValue) {
        voted.push({userVoted: _pollingOptions.value, fid: frameData?.fid})
        return{..._pollingOptions ,voteCount: _pollingOptions.voteCount+1}
      }
      return _pollingOptions
    })
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: 'black',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 40,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              marginTop: 30,
              padding: '0 120px',
              whiteSpace: 'pre-wrap',
              display: 'flex',
              flexDirection : 'column',
            }}
          >
            <h2>
              Recorded Vote!~
            </h2>
            <ul style={{display : 'flex', flexDirection: 'column'}}>
              {
                pollingOptions.map(_pollingOption => {
                  return(
                    <li key={_pollingOption.optionTag}>
                      {_pollingOption.optionTag} : {_pollingOption.value} - {_pollingOption.voteCount}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      )
    })
  }
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 40,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
            display: 'flex',
            flexDirection : 'column',
          }}
        >
          <h2>
            Q: What topics do you want covered in upcoming videos?
          </h2>
          <ul style={{display : 'flex', flexDirection: 'column'}}>
            {
              pollingOptions.map(_pollingOption => {
                return(
                  <li key={_pollingOption.optionTag}>
                    {_pollingOption.optionTag} : {_pollingOption.value}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Suggest A Topic..." />,
      ...pollingOptions.map(_pollingOption => <Button value={_pollingOption.value}>{_pollingOption.optionTag}</Button>),
      <Button value="Nothing">Add Topic</Button>
    ],
  })
})

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)