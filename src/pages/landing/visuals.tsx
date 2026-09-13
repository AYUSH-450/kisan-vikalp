import { cn } from '../../utils/cn';

export function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center bg-primary-800 text-white',
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 21V8" strokeLinecap="round" />
        <path d="M12 8c-2.2-2.4-5.2-3.2-8-3 1.4 3.2 3.6 5.2 8 6.2" strokeLinecap="round" />
        <path d="M12 8c2.2-2.4 5.2-3.2 8-3-1.4 3.2-3.6 5.2-8 6.2" strokeLinecap="round" />
        <path d="M8 17h8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function BrandLockup({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Mark />
      <div className="leading-tight">
        <div className={cn('text-[15px] font-semibold tracking-tight', inverted ? 'text-white' : 'text-ink')}>
          Kisan Vikalp
        </div>
        <div className={cn('text-[10px] font-medium uppercase tracking-[0.16em]', inverted ? 'text-white/70' : 'text-ink/55')}>
          Procurement orchestration
        </div>
      </div>
    </div>
  );
}

export function CentreComparison() {
  return (
    <figure className="border border-ink/10 bg-white">
      <figcaption className="border-b border-ink/10 px-5 py-3 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ochre">Where should I go?</p>
        <p className="mt-1 font-serif text-xl text-ink">Best centre by expected total time, not distance.</p>
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-paper text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/60">
              <th className="px-5 py-3 font-semibold sm:px-6">Measure</th>
              <th className="px-4 py-3 font-semibold">Centre A</th>
              <th className="bg-primary-50 px-4 py-3 font-semibold text-primary-800">Centre B · recommended</th>
            </tr>
          </thead>
          <tbody className="text-ink">
            {[
              ['Distance', '8 km · closer', '14 km · farther'],
              ['Travel time', '12 min', '18 min'],
              ['Expected queue', '68 min · high load', '24 min · lower wait'],
              ['Expected service', '12:18 PM', '11:35 AM'],
              ['Total journey', '80 minutes', '42 minutes'],
            ].map(([label, a, b], i) => (
              <tr key={label} className={i === 4 ? 'bg-paper/70 font-semibold' : 'border-b border-ink/10'}>
                <th scope="row" className="px-5 py-3 font-medium text-ink/70 sm:px-6">
                  {label}
                </th>
                <td className="px-4 py-3 text-ink/80">{a}</td>
                <td className="bg-primary-50/70 px-4 py-3 text-primary-900">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-ink/10 px-5 py-3 text-xs leading-relaxed text-ink/65 sm:px-6">
        Centre A is nearer, but Centre B finishes the farmer’s day sooner. Recommendation uses travel time + queue +
        processing conditions.
      </p>
    </figure>
  );
}

export function DeparturePanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <article className="border border-ink/10 bg-white p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ochre">When should I leave?</p>
        <p className="mt-4 font-serif text-4xl text-ink">11:01 AM</p>
        <p className="mt-1 text-sm text-ink/60">Recommended departure</p>
        <dl className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink/55">Expected service</dt>
            <dd className="font-medium text-ink">11:35 AM</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink/55">Travel</dt>
            <dd className="font-medium text-ink">18 min</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink/55">Expected queue</dt>
            <dd className="font-medium text-ink">24 min</dd>
          </div>
        </dl>
        <p className="mt-5 bg-primary-800 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white">
          Leave now
        </p>
      </article>
      <article className="border border-dashed border-ink/20 bg-paper p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/50">If the queue eases</p>
        <p className="mt-4 font-serif text-4xl text-ink/40">10:48 AM</p>
        <p className="mt-1 text-sm text-ink/55">Earlier estimate — not yet</p>
        <p className="mt-5 border border-ink/15 bg-white px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink/70">
          Don’t leave yet
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink/65">
          An appointment time alone is not enough. Departure updates as travel, queue length, and centre processing
          rate change.
        </p>
      </article>
    </div>
  );
}

export function QueueAndTimeline() {
  const steps = [
    { label: 'Booking confirmed', done: true },
    { label: 'Checked in', done: true },
    { label: 'Quality inspection', done: false, current: true },
    { label: 'Weighing', done: false },
    { label: 'Procurement completed', done: false },
    { label: 'Payment processing', done: false },
    { label: 'Payment completed', done: false },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <article className="border border-ink/10 bg-white p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ochre">How long will I wait?</p>
        <h3 className="mt-2 font-serif text-2xl text-ink">Virtual queue</h3>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-primary-800 p-4 text-white">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">Queue number</p>
            <p className="mt-1 font-serif text-3xl">A042</p>
          </div>
          <div className="border border-ink/10 p-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-ink/50">Farmers ahead</p>
            <p className="mt-1 font-serif text-3xl text-ink">7</p>
          </div>
        </div>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between border-b border-ink/10 py-2">
            <dt className="text-ink/55">Expected wait</dt>
            <dd className="font-medium text-ink">about 32 minutes</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-ink/55">Expected service</dt>
            <dd className="font-medium text-ink">11:35 AM</dd>
          </div>
        </dl>
        <p className="mt-2 text-sm text-ink/60">The officer sees the same operational queue from the centre.</p>
      </article>

      <article className="border border-ink/10 bg-white p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ochre">What is happening?</p>
        <h3 className="mt-2 font-serif text-2xl text-ink">Procurement timeline</h3>
        <ol className="mt-6">
          {steps.map((step, index) => (
            <li key={step.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'mt-1 h-2.5 w-2.5 rounded-full',
                    step.done && 'bg-primary-700',
                    step.current && 'bg-ochre ring-4 ring-ochre/15',
                    !step.done && !step.current && 'bg-ink/20',
                  )}
                />
                {index < steps.length - 1 && <span className="w-px flex-1 bg-ink/10" />}
              </div>
              <p
                className={cn(
                  'pb-4 text-sm last:pb-0',
                  step.current ? 'font-semibold text-ink' : step.done ? 'text-ink/80' : 'text-ink/45',
                )}
              >
                {step.label}
                {step.current ? ' · in progress' : ''}
              </p>
            </li>
          ))}
        </ol>
        <p className="text-sm text-ink/60">
          The farmer should not have to call the centre to learn what happened to the produce.
        </p>
      </article>
    </div>
  );
}

export function DigitalPassPreview() {
  return (
    <aside className="self-start border border-ink/10 bg-white shadow-[0_12px_40px_rgba(27,36,48,0.08)]">
      <div className="bg-primary-800 px-5 py-3 text-white">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Digital procurement pass</p>
        <p className="font-serif text-lg">Ramesh Kumar</p>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 px-5 py-5 text-sm">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink/45">Transaction</p>
          <p className="font-medium text-ink">TX938421</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink/45">Token</p>
          <p className="font-serif text-2xl text-primary-800">A042</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink/45">Crop</p>
          <p className="font-medium text-ink">Paddy · 30 Q</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink/45">Centre</p>
          <p className="font-medium text-ink">Centre B</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink/45">Slot</p>
          <p className="font-medium text-ink">11:00–12:00</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-ink/45">Farmer ID</p>
          <p className="font-medium text-ink">F12345</p>
        </div>
      </div>
      <div className="border-t border-dashed border-ink/15 bg-paper px-5 py-4">
        <div className="flex items-center gap-4">
          <div
            className="grid h-16 w-16 grid-cols-5 gap-px bg-ink p-1"
            aria-hidden="true"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg,#1b2430 0 2px,transparent 2px 5px), repeating-linear-gradient(#1b2430 0 2px,transparent 2px 5px)',
              backgroundColor: '#fff',
            }}
          />
          <div>
            <p className="font-mono text-xs font-semibold text-ink">SP-TX938421-SECURE</p>
            <p className="mt-1 text-xs leading-relaxed text-ink/60">
              PDF417 holds a reference token only — not Aadhaar, bank details, or other personal data.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function CommandCentrePreview() {
  return (
    <div className="border border-ink/10 bg-ink text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
          GIS command centre
        </p>
        <p className="text-[11px] text-white/45">Location + queue + capacity + demand</p>
      </div>
      <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative min-h-[280px] overflow-hidden bg-[#15202b] p-6">
          <svg viewBox="0 0 360 240" className="h-full w-full" role="img" aria-label="Schematic of three procurement centres">
            <path d="M40 50h90v70H40z" fill="#1e2d3a" stroke="#3d5366" />
            <path d="M160 30h120v90H160z" fill="#1e2d3a" stroke="#3d5366" />
            <path d="M70 140h170v70H70z" fill="#1e2d3a" stroke="#3d5366" />
            <circle cx="85" cy="85" r="10" fill="#c24141" />
            <circle cx="230" cy="75" r="8" fill="#3d9b5f" />
            <circle cx="155" cy="175" r="8" fill="#d4a017" />
            <text x="100" y="80" fill="#f4f1ea" fontSize="11">
              Centre A · high load
            </text>
            <text x="244" y="78" fill="#f4f1ea" fontSize="11">
              Centre B · optimal
            </text>
            <text x="170" y="178" fill="#f4f1ea" fontSize="11">
              Centre C · medium
            </text>
            <path d="M95 90 C140 110, 180 90, 222 78" fill="none" stroke="#9a5b12" strokeDasharray="4 3" />
          </svg>
        </div>
        <div className="space-y-4 border-t border-white/10 p-6 lg:border-l lg:border-t-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ochre">
            What should government do?
          </p>
          <p className="font-serif text-xl leading-snug">
            Redirect 120 future bookings from District North / Centre A toward District East / Centre B.
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Adjust slot availability at Centre A</li>
            <li>Use spare capacity at Centre B</li>
            <li>Consider temporary staffing if load persists</li>
          </ul>
          <p className="text-sm text-white/50">
            Intelligence should recommend an intervention, not only report that a centre is crowded.
          </p>
        </div>
      </div>
    </div>
  );
}

export function DemandBars() {
  const days = [
    { d: 'Mon', h: 42 },
    { d: 'Tue', h: 55 },
    { d: 'Wed', h: 68 },
    { d: 'Thu', h: 74 },
    { d: 'Fri', h: 96, predicted: true },
    { d: 'Sat', h: 84, predicted: true },
    { d: 'Sun', h: 50, predicted: true },
  ];

  return (
    <figure className="border border-ink/10 bg-white p-6">
      <figcaption className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ochre">What will happen next?</p>
          <p className="mt-1 font-serif text-xl text-ink">Demand vs centre capacity</p>
        </div>
        <p className="text-xs text-ink/50">Illustrative demonstration data · Centre A</p>
      </figcaption>
      <div className="mt-8 flex h-40 items-end gap-3 sm:gap-4">
        {days.map((day) => (
          <div key={day.d} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={cn('w-full max-w-10', day.predicted ? 'bg-ochre/70' : 'bg-primary-800')}
              style={{ height: `${day.h}%` }}
            />
            <span className="text-[11px] text-ink/55">{day.d}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 text-xs text-ink/60">
        <span>Capacity line ≈ 80% utilisation</span>
        <span>Friday predicted above capacity</span>
      </div>
    </figure>
  );
}
