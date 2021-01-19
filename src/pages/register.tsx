import {FormEvent, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Axios from 'axios'
import {useRouter} from 'next/router'

import {useAuthState} from '../context/auth'
import InputGroup from '../components/InputGroup'

export default function Register() {
  const [email, setEmail ] = useState('')
  const [username, setUsername ] = useState('')
  const [password, setPassword ] = useState('')
  const [agreement, setAgreement ] = useState(false)
  const [errors, setErrors ] = useState<any>({})
  const {authenticated} = useAuthState()

  const router = useRouter()

  if(authenticated) router.push('/')

  const submitForm = async(event: FormEvent)=>{
    event.preventDefault()

    if(!agreement){
      setErrors({...errors, agreement:'You must agree to Terms & Conditions'})
      return
    }

    try{
      await Axios.post('/auth/register',{email, username, password})
      router.push('/login')
    }catch(err){
      setErrors(err.response.data)
    }
    
  }
  return (
    <div className="flex bg-white">
      <Head>
        <title>Register</title>
      </Head>

      <div className="w-40 h-screen bg-center bg-cover" style={{backgroundImage:"url('/images/bricks.jpg')"}}></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
          <p className="mb-5 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={submitForm}>
            <div className="mb-6">
              <input 
              type="checkbox" 
              className="mr-1 text-xs cursor-pointer" 
              id="agreement"
              checked={agreement}
              onChange={e => setAgreement(e.target.checked)}
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I agree to get emails about stuff on Readit 
              </label>
              <small className="block font-medium text-red-600">{errors.agreement}</small>
            </div>
            <InputGroup className="mb-2" type="email" placeholder="E-mail" value ={email} setValue={setEmail} error={errors.email}/>
            <InputGroup className="mb-2" type="text" placeholder="Username" value ={username} setValue={setUsername} error={errors.username}/>
            <InputGroup className="mb-4" type="password" placeholder="Password" value ={password} setValue={setPassword} error={errors.password}/>

            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-400 border border-blue-500 rounded">Sign Up</button>
          </form>
          <small>
            Already a Readitor?
            <Link href="/login">
              <a className="ml-1 text-blue-400 uppercase">Login</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  )
}
