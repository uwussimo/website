import useSWR from 'swr'
import Page from '@components/page'
import Link from 'next/link'
import Image from 'next/image'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const players = (list) => {
  return (
    <ul>
      {list.map((p) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </ul>
  )
}

const Minecraft = () => {
  const { data, error } = useSWR('/api/minecraft', fetcher, {
    refreshInterval: 2000,
  })

  if (error)
    return (
      <Page description="Damn, I can't load server stats">
        <article>
          <h1 align="center">Oops, I failed to load data</h1>
        </article>
      </Page>
    )

  if (!data)
    return (
      <Page description="Hey, would you like to join my Minecraft server?">
        <article>
          <h1 align="center">Hold on, I&#39;m loading...</h1>
        </article>
      </Page>
    )

  if (!data.status)
    return (
      <Page description="Hey, would you like to join my Minecraft server?">
        <article>
          <h1 align="center">Sad, seems like server is offline...</h1>
          <p align="center">
            I don&#39;t remember installing python, php or apache to my server
            🤔
          </p>
        </article>
      </Page>
    )

  return (
    <Page description="Hey, would you like to join my Minecraft server?">
      <article>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/favicons/uwucraft.png"
          alt="UwUcraft Server Icon"
          height="100"
        />

        <p>
          Recently, I created my own Minecraft Server to enjoy my free time on
          my server. Feel free to join me if you want to spend some time with
          me! Also, you can view{' '}
          <a href="https://github.com/uwussimo/minecraft">
            <u>repository</u>
          </a>{' '}
          of my minecraft server where I synchronise all my changes.
        </p>

        <blockquote>
          Don&#39;t forget to read the rules of my server to avoid getting
          banned all of sudden. Rules are located at{' '}
          <Link href="/minecraft/rules">/minecraft/rules</Link> page
        </blockquote>

        <pre>
          <b>Online:</b> {data.status ? 'Yup' : 'Nope'}
          <br />
          <b>Players:</b> {data.content.players.online}/
          {data.content.players.max}
          <br />
          <b>Address:</b> owo.uwussi.moe:25565
          <br />
          <b>Software:</b> Vanilla {data.content.version.name}
          <br />
        </pre>

        {data.content.players.sample && players(data.content.players.sample)}

        <h4>For Developers</h4>

        <pre>
          {'// GET: /api/minecraft'}
          <br />
          {JSON.stringify(data.content, null, 2)}
        </pre>
      </article>
    </Page>
  )
}

export default Minecraft
