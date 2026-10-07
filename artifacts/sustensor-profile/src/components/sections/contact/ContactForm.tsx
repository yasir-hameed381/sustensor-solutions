import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Mail, MessageCircle, RotateCcw } from 'lucide-react';

import { company } from '@/content/company';
import { solutions } from '@/content/solutions';
import { cn } from '@/lib/utils';

import { Button } from '../../ui/Button';

/*
 * The site has no backend, so a valid enquiry is handed to the visitor's own email app (mailto:)
 * or to WhatsApp, pre-filled. The success state says exactly that rather than claiming it was sent.
 */

type Field = 'name' | 'email' | 'company' | 'interest' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Channel = 'email' | 'whatsapp';

const EMPTY: Values = { name: '', email: '', company: '', interest: '', message: '' };
const GENERAL = 'General enquiry';
const interests = [...solutions.map((solution) => solution.title), GENERAL];

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Please enter a valid email address, e.g. name@company.com.';
  if (values.message.trim().length < 20) errors.message = 'Please tell us a little more (at least 20 characters).';
  return errors;
}

function composeBody(values: Values) {
  return [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    values.company.trim() && `Company: ${values.company.trim()}`,
    `Interest: ${values.interest || GENERAL}`,
    '',
    values.message.trim(),
  ]
    .filter((line) => line !== '')
    .join('\n');
}

export function ContactForm() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<{ state: 'idle' } | { state: 'done' | 'error'; channel: Channel }>({ state: 'idle' });

  const update = (field: Field, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: Field) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validate(values));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = submitter?.value === 'whatsapp' ? 'whatsapp' : 'email';

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const body = composeBody(values);
    try {
      if (channel === 'email') {
        const subject = `Consultation request: ${values.interest || GENERAL}`;
        window.location.href = `${company.emailUrl}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      } else {
        // Not using the 'noopener' feature: with it, window.open always returns null and a blocked pop-up can't be detected.
        const opened = window.open(`${company.whatsappUrl}?text=${encodeURIComponent(body)}`, '_blank');
        if (opened === null) throw new Error('Pop-up blocked');
        opened.opener = null;
      }
      setStatus({ state: 'done', channel });
    } catch {
      setStatus({ state: 'error', channel });
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus({ state: 'idle' });
  };

  if (status.state === 'done') {
    const viaEmail = status.channel === 'email';
    return (
      <div role="status" className="panel-in flex h-full flex-col items-start justify-center gap-5 rounded-2xl border border-accent-100 bg-surface p-8 shadow-md sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <CheckCircle2 aria-hidden="true" className="size-6" />
        </span>
        <div>
          <h3 className="text-h3 text-fg">Your message is ready to send</h3>
          <p className="mt-3 text-body text-fg-muted">
            {viaEmail
              ? 'We opened your email app with your enquiry filled in. Press send there and our briefing desk will reply.'
              : 'We opened WhatsApp with your enquiry filled in. Press send there and we will reply.'}{' '}
            If nothing opened, email us at{' '}
            <a href={company.emailUrl} className="font-semibold text-accent-700 underline underline-offset-4">
              {company.email}
            </a>
            .
          </p>
        </div>
        <Button variant="secondary" size="sm" icon={RotateCcw} iconPosition="leading" onClick={reset}>
          Write another message
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={submit}
      aria-labelledby={`${formId}-title`}
      className="rounded-2xl border border-hairline bg-surface p-6 shadow-md sm:p-8 lg:p-10"
    >
      <h3 id={`${formId}-title`} className="text-h3 text-fg">
        Contact Us
      </h3>

      {status.state === 'error' && (
        <div role="alert" className="mt-6 flex gap-3 rounded-md border border-danger-600/30 bg-danger-50 p-4 text-small text-danger-600">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>
            We couldn’t open {status.channel === 'email' ? 'your email app' : 'WhatsApp'}. Please email us directly at{' '}
            <a href={company.emailUrl} className="font-semibold underline underline-offset-4">
              {company.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 [&>*]:min-w-0">
        <TextField id={`${formId}-name`} name="name" label="Full name" required autoComplete="name" value={values.name} error={touched.name ? errors.name : undefined} onChange={update} onBlur={blur} />
        <TextField id={`${formId}-email`} name="email" label="Work email" type="email" required autoComplete="email" value={values.email} error={touched.email ? errors.email : undefined} onChange={update} onBlur={blur} />
        <TextField id={`${formId}-company`} name="company" label="Company" autoComplete="organization" value={values.company} onChange={update} onBlur={blur} />
        <FieldShell id={`${formId}-interest`} label="Area of interest">
          <select
            id={`${formId}-interest`}
            name="interest"
            value={values.interest}
            onChange={(event) => update('interest', event.target.value)}
            className={inputClass(false)}
          >
            <option value="">Select a solution (optional)</option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </FieldShell>
        <div className="sm:col-span-2">
          <FieldShell id={`${formId}-message`} label="How can we help?" required error={touched.message ? errors.message : undefined}>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={5}
              required
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={touched.message && errors.message ? `${formId}-message-error` : undefined}
              value={values.message}
              onChange={(event) => update('message', event.target.value)}
              onBlur={() => blur('message')}
              className={cn(inputClass(Boolean(touched.message && errors.message)), 'h-auto resize-y py-3')}
              placeholder="Your goals, timelines, or the challenge you’re facing."
            />
          </FieldShell>
        </div>
      </div>

      <div className="mt-8 border-t border-hairline pt-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" value="email" variant="primary" size="lg" icon={Mail} iconPosition="leading" className="sm:flex-1">
            Send via email
          </Button>
          <Button type="submit" value="whatsapp" variant="secondary" size="lg" icon={MessageCircle} iconPosition="leading" className="sm:flex-1">
            Send via WhatsApp
          </Button>
        </div>
        <p className="mt-3 text-center text-caption text-fg-subtle">Opens your email app or WhatsApp with your message ready to send.</p>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    'block h-12 w-full min-w-0 rounded-md border bg-surface px-4 text-body text-fg shadow-xs placeholder:text-fg-subtle',
    'transition-[border-color,box-shadow] duration-(--duration-fast)',
    'focus:outline-none focus-visible:outline-none focus:ring-4',
    invalid
      ? 'border-danger-600 focus:border-danger-600 focus:ring-danger-600/15'
      : 'border-hairline-strong hover:border-fg-subtle focus:border-accent-600 focus:ring-accent-500/20',
  );
}

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

function FieldShell({ id, label, required, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-small font-semibold text-fg">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-accent-700">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-caption font-medium text-danger-600">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

interface TextFieldProps {
  id: string;
  name: Field;
  label: string;
  value: string;
  type?: 'text' | 'email';
  required?: boolean;
  autoComplete?: string;
  error?: string;
  onChange: (field: Field, value: string) => void;
  onBlur: (field: Field) => void;
}

function TextField({ id, name, label, value, type = 'text', required, autoComplete, error, onChange, onBlur }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
        className={inputClass(Boolean(error))}
      />
    </FieldShell>
  );
}
