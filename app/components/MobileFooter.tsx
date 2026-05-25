export default function MobileFooter() {
  return (
    <footer className="mx-6 flex flex-col gap-4 border-t border-dashed border-black pb-10 pt-6 text-body">
      <div className="flex flex-col gap-2 items-start text-black">
        <p>Made with ✨ by Katherine Zhang</p>
        <p>2026</p>
      </div>
      <div className="flex flex-col gap-4 items-end text-black">
        <p>Let&rsquo;s Chat</p>
        <div className="flex flex-col gap-2 items-end text-subtext">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:zhangskath@gmail.com">zhangskath@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
