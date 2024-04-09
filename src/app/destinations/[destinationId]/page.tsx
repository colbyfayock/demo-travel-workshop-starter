import { redirect } from 'next/navigation';
import { getCldImageUrl, getCldOgImageUrl } from 'next-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

import Container from '@/components/Container';
import CldVideoPlayer from '@/components/CldVideoPlayer';
import CldUploadButton from '@/components/CldUploadButton';
import CldImage from '@/components/CldImage';

import { CloudinaryResource } from '@/types/cloudinary';

import destinations from '@/data/destinations.json';

import 'next-cloudinary/dist/cld-video-player.css';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function Destination({ params }: { params: { destinationId: string; }}) {
  const destination = destinations.find(({ id }) => id === params.destinationId);

  if ( !destination ) {
    redirect('/404');
  }

  const results = await cloudinary.search
    .expression(`folder=my-travel-ai/uploads AND tags=destination-${destination.id}`)
    .with_field('context')
    .with_field('tags')
    .execute();
  const { resources: travelerPhotos } = (results || {}) as { resources: Array<CloudinaryResource> };

  return (
    <>
      <Container className="relative flex max-w-7xl items-center justify-center aspect-[3/1] bg-black xl:rounded-lg overflow-hidden">
        <span className="block absolute top-0 left-0 right-0 bottom-0 z-0 opacity-70 m-auto w-full h-full bg-no-repeat bg-center bg-cover" style={{
          backgroundImage: `url(${getCldImageUrl({
            src: destination.image.publicId,
            width: 2560,
            height: 854,
            crop: 'fill'
          })})`
        }} />
        <h1 className="relative z-10 text-white text-7xl uppercase font-black">{ destination.title }</h1>
      </Container>

      <Container className="my-36">
        <div className="max-w-2xl prose-lg text-center mx-auto">
          <h2>About { destination.title }</h2>
          <p>{ destination.description }</p>
        </div>
      </Container>


      {destination.items && (
        <Container className="my-36">
          <div className="prose-lg mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="m-0">What To Pack</h2>
            </div>
            <ul className="grid grid-cols-4 gap-12 p-0">
              {destination.items.map((item) => {
                return (
                  <li key={item.publicId} className="relative m-0 p-0">
                    <CldImage
                      className="m-0"
                      src={item.publicId}
                      width={600}
                      height={600}
                      alt=""
                    />
                    <p className="absolute bottom-2 -left-1 bg-[#009739] text-white px-3 py-1 text-sm font-bold rounded">
                      { item.title }
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      )}

      <Container className="my-36">
        <div className="prose-lg mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="m-0">Traveler&apos;s Photos</h2>
            <CldUploadButton
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              signatureEndpoint="/api/sign-cloudinary-params"
              options={{
                tags: ['traveler-photo', `destination-${destination.id}`],
                folder: 'my-travel-ai/uploads',
              }}
            >
              Add a Photo
            </CldUploadButton>
          </div>

          {travelerPhotos.length > 0 && (
            <ul className="grid grid-cols-4 gap-2 p-0">
              {travelerPhotos.map((photo) => {
                return (
                  <li key={photo.public_id} className="m-0 p-0">
                    <CldImage
                      className="m-0"
                      src={photo.public_id}
                      width={526}
                      height={526}
                      crop="fill"
                      alt=""
                    />
                  </li>
                )
              })}
            </ul>
          )}
          {travelerPhotos.length === 0 && (
            <p className="text-center text-zinc-500 mt-24">No photos, add yours!</p>
          )}
        </div>
      </Container>
      
      {destination.explore && (
        <Container className="my-24">
          <div className="prose-lg mx-auto mb-12">
            <h2 className="m-0">Explore { destination.title }</h2>
          </div>

          <ul className="grid grid-cols-3 gap-2 p-0">
            {destination.explore.map(video => {
              return (
                <li key={video.publicId} className="m-0 p-0">
                  <CldVideoPlayer
                    id={`explore-${video.publicId.replace('/', '')}`}
                    className="mx-auto"
                    width={video.width}
                    height={video.height}
                    src={video.publicId}
                    controls
                  />
                </li>
              )
            })}
          </ul>
        </Container>
      )}
    </>
  )
}

export async function generateMetadata({ params }: { params: { destinationId: string; }}) {
  const destination = destinations.find(({ id }) => id === params.destinationId);

  if ( !destination ) return {};

  const publicId = destination.image.publicId;
  const headline = destination.title;

  return {
    title: `Visit ${destination.title}`,
    openGraph: {
      images: [
        {
          // Prefer a different size? Be sure to update the width and height of the
          // metadata as well as the image configuration of getCldOgImageUrl
          width: 1200,
          height: 627,
          url: getCldOgImageUrl({
            src: publicId,
            effects: [{ colorize: '100,co_black' }],
            overlays: [
              {
                publicId,
                width: 2400,
                height: 1254,
                crop: 'fill',
                effects: [{
                  opacity: 60
                }]
              },
              {
                width: 1400,
                crop: 'fit',
                text: {
                  alignment: 'center',
                  color: 'white',
                  fontFamily: 'Source Sans Pro',
                  fontSize: 210,
                  fontWeight: 'bold',
                  text: headline
                }
              }
            ]
          })
        }
      ]
    }
  }
}