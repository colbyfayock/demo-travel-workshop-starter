import Container from '@/components/Container';

const Footer = () => {
  return (
    <footer className="mt-20">
      <Container>
        <p className="text-center text-slate-400 border-t-2 p-6">
          Built with <a className="underline font-medium text-inherit" href="https://nextjs.org/">Next.js</a> & <a className="underline font-medium text-inherit" href="https://cloudinary.com/">Cloudinary</a> by <a className="underline font-medium text-inherit" href="https://twitter.com/colbyfayock">Colby Fayock</a>.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;