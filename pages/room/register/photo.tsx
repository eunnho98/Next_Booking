import RegisterRoomPhoto from '@/components/register/RegisterRoomPhoto';
import { fstorage } from '@/firebase/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { GetStaticPropsResult, InferGetStaticPropsType } from 'next/types';
import React from 'react';

type Props = {
  images: string[];
};
export async function getStaticProps(): Promise<{ props: Props }> {
  const fileRef = ref(fstorage, 'image/');
  const result = await listAll(fileRef);
  const urls = await Promise.all(
    result.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return url;
    }),
  );

  return {
    props: {
      images: urls,
    },
  };
}

function photo({ images }: Props) {
  return <RegisterRoomPhoto images={images} />;
}

export default photo;
