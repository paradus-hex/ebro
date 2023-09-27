import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../components/ui/button'

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div className="grid grid-cols-12 text-2xl w-full text-center">
        <div className='col-span-3 h-screen bg-red-600'>

        </div>
        <div className='col-span-9 h-screen bg-blue-600'>

        </div>
       
      </div>
      {/* <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/next">
          <a className="btn-blue">Go to next page</a>
        </Link>
      </div> */}
    </React.Fragment>
  )
}

export default Home
