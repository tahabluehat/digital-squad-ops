CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.contact_submissions TO anon;
GRANT SELECT, INSERT ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous contact form inserts"
ON public.contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated contact form inserts"
ON public.contact_submissions
FOR INSERT
TO authenticated
WITH CHECK (true);