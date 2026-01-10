-- Add admin-only SELECT policy for contact_submissions
CREATE POLICY "Admins can view contact submissions"
ON contact_submissions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add admin-only UPDATE policy for contact_submissions
CREATE POLICY "Admins can update contact submissions"
ON contact_submissions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add admin-only DELETE policy for contact_submissions
CREATE POLICY "Admins can delete contact submissions"
ON contact_submissions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));