import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Page from '../components/page'
import {useState, useEffect, use} from 'react'


export default function Home() {


  const [fading, setFading] = useState(false);

  useEffect( () =>{
    setTimeout(() => {
      setFading(true);

    }, 0)
  
    
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>tr1e_</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


  <Page>
  <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">

  <div className="flex flex-col-reverse sm:flex-row items-start gap-40z">

            <div className="flex flex-col pr-8">
              <h1 className={'font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white transition-opacity duration-700 ' + (fading ? 'opacity-100 ease-in ' : 'opacity-0 ease-in ' )}>
                tr1e_
              </h1>
              <h2 className={'text-gray-700 dark:text-gray-200 mb-4 mt-2 transition-opacity duration-700  delay-300 ' + (fading ? 'opacity-100 ease-in ' : 'opacity-0 ease-in ' )}>

student/developer/learner
              </h2>
              <p className={'text-gray-600 dark:text-gray-400 mb-16 duration-700  delay-300 ' + (fading ? 'opacity-100 ease-in ' : 'opacity-0 ease-in ' )}>
bing bongbongbongbongbongbongbongbongbongbongbongbongb
              </p>
            </div>
              <Image
                alt="Tri Ho"
                height={176}
                width={176}
                src="/mikupinkpfp.jpg"
                sizes="50vw"
                priority
              />
          </div>
          </div>
  </Page>
    </div>
  )
}
