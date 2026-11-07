interface ScrollProgressProps {
  progress: React.RefObject<number>;
}

const ScrollProgress = ({ progress }: ScrollProgressProps) => {
  return (
    <div className="fixed right-0 top-0 bottom-0 w-[3px] z-[60] pointer-events-none">
      <div className="absolute inset-0 bg-secondary/30" />
      <div
        className="absolute top-0 left-0 w-full h-full bg-primary origin-top"
        style={{ transform: `scaleY(${progress.current})` }}
      />
    </div>
  );
};

export default ScrollProgress;