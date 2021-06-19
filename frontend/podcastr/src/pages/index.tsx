import { GetServerSideProps } from 'next';
import Image from 'next/image';
// import { format, parseISO } from 'date-fns';
// import ptBR from 'date-fns/esm/locale/pt-BR/index.js';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import styles from './home.module.scss'

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  description: string;
  duration: string;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  latestEpisodes: Array<Episode>
  allEpisodes: Array<Episode>
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Últiomos lançamentos</h2>

        <ul>
          { latestEpisodes.map(episode => (
            <li key={episode.id}>
              <Image
                height={192}
                width={192}
                src={episode.thumbnail}
                alt={episode.title} 
                objectFit="cover"
              />

              <div className={styles.episodeDetails}>
                <a href="">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button">
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          )) }
        </ul>
      </section>
      <section className={styles.allEspisodes}></section>
    </div>
  )
}

export  const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      thumbnail: episode.thumbnail,
      // publishedAt: format(parseISO(episode.published_at), 'd MMM y', { locale: ptBR }),
      publishedAt: new Date(episode.published_at).toLocaleDateString(),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(episode.file.duration),
      description: episode.description,
      url: episode.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);
  
  return {
    props: {
      latestEpisodes,
      allEpisodes
    }
  }
}