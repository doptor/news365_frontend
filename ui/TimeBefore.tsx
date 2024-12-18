interface TimeBeforeProp {
  clss?: string;
  title: string;
}

const TimeBefore = ({ clss, title }: TimeBeforeProp) => {
  return (
    <div className={clss}>
      <p className="mt-3 text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
        {title}
      </p>
    </div>
  );
};

export default TimeBefore;
