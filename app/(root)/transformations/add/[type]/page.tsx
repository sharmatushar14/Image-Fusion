import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { auth } from '@clerk/nextjs';
import React from 'react'
import { redirect } from 'next/navigation';
import { getUserbyId } from '@/lib/actions/user.actions';

const AddTransformationTypePage = async ({params: {type}}: SearchParamProps) => {
  const transformation= transformationTypes[type];
  const {userId}= auth(); //Clerk Authenication Function
  if(!userId) redirect('/sign-in')
  const user = await getUserbyId(userId)
  return (
    <>
    <Header title={transformation.title} 
    subtitle={transformation.subTitle} />

    <section className='mt-10'>
    <TransformationForm
    action="Add"
    userId={user._id}
    type={transformation.type as TransformationTypeKey}
    creditBalance={user.creditBalance}/>
    </section>
    </>

  )
}

export default AddTransformationTypePage
