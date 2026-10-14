import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { DICTIONARIES, useLanguage } from '../i18n/context.js';
import { submitBooking } from '../services/booking.js';
import { flipInRtl } from '../theme.js';

// Labels live under booking.serviceOptions.<value> in the i18n files.
const SERVICE_VALUES = ['weddings', 'contracts', 'land', 'other'];

const INITIAL_VALUES = { name: '', surname: '', phone: '', service: '', date: '', time: '', message: '', consent: false };

// Order matters: the first invalid field in this list gets focus on submit.
const VALIDATED_FIELDS = ['name', 'surname', 'phone', 'service', 'consent'];

// Returns a key under booking.errors (or ''), not a message, so errors already on screen
// switch language along with the rest of the page.
function validateField(field, values) {
  const value = values[field];
  switch (field) {
    case 'name':
    case 'surname':
    case 'service':
      return value.trim() ? '' : field;
    case 'phone': {
      if (!value.trim()) return 'phoneRequired';
      const digits = value.replace(/\D/g, '');
      return /^\+?[\d\s().-]+$/.test(value.trim()) && digits.length >= 6 && digits.length <= 15
        ? ''
        : 'phoneInvalid';
    }
    case 'consent':
      return value ? '' : 'consent';
    default:
      return '';
  }
}

function validate(values) {
  const errors = {};
  VALIDATED_FIELDS.forEach((field) => {
    const message = validateField(field, values);
    if (message) errors[field] = message;
  });
  return errors;
}

// Label above the input, as in the reference. `labelId` lets the Select reference it via aria-labelledby.
function Field({ id, label, required, children }) {
  return (
    <Box>
      <Typography
        component="label"
        htmlFor={id}
        id={`${id}-label`}
        sx={{ display: 'block', mb: 1, fontSize: '0.875rem', fontWeight: 600, color: 'text.primary' }}
      >
        {label}
        {required && (
          <Box component="span" aria-hidden sx={{ color: 'secondary.main', ml: 0.5 }}>
            *
          </Box>
        )}
      </Typography>
      {children}
    </Box>
  );
}

function BookingIntro() {
  const { t } = useLanguage();

  return (
    <>
      <SectionHeading
        eyebrow={t('booking.eyebrow')}
        title={t('booking.title')}
        subtitle={t('booking.subtitle')}
        titleId="book-title"
        sx={{ mb: 4 }}
      />
      <Reveal
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 3,
          display: 'grid',
          gap: 1.5,
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: '16px',
        }}
      >
        {t('booking.tips').map((tip) => (
          <Box component="li" key={tip} sx={{ display: 'flex', gap: 1.5, fontSize: '0.875rem', color: 'text.primary' }}>
            <CheckRoundedIcon aria-hidden sx={{ fontSize: 18, mt: '1px', color: 'secondary.main', flexShrink: 0 }} />
            {tip}
          </Box>
        ))}
      </Reveal>
    </>
  );
}

export default function Booking() {
  const { t, lang } = useLanguage();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success' });
  const serviceLabel = (value) => t(`booking.serviceOptions.${value}`);
  const fieldText = (name, key) => t(`booking.fields.${name}.${key}`);
  // Errors only appear after a submit attempt; once shown, they update live as the user fixes them.
  const update = (field, value) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }));
    }
  };

  // Keep the message while the Snackbar animates out.
  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const handleChange = (field) => (event) => update(field, event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = VALIDATED_FIELDS.find((field) => nextErrors[field]);
    if (firstInvalid) {
      // Every field (including the Select's combobox) carries the id `booking-<field>`.
      document.getElementById(`booking-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await submitBooking({
        name: values.name.trim(),
        surname: values.surname.trim(),
        phone: values.phone.trim(),
        // The email is for the office, so the service is always named in English.
        service: DICTIONARIES.en.booking.serviceOptions[values.service],
        date: values.date,
        time: values.time,
        message: values.message.trim(),
        language: lang,
      });
      setSnackbar({ open: true, severity: 'success' });
    } catch {
      setSnackbar({ open: true, severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const textFieldProps = (field, extra = {}) => ({
    id: `booking-${field}`,
    name: field,
    value: values[field],
    onChange: handleChange(field),
    error: Boolean(errors[field]),
    helperText: errors[field] ? t(`booking.errors.${errors[field]}`) : undefined,
    fullWidth: true,
    ...extra,
  });

  return (
    <Box
      component="section"
      id="book"
      aria-labelledby="book-title"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.alt' }}
    >
      <Container>
        <Grid container columnSpacing={6} rowSpacing={6} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <BookingIntro />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Reveal delay={100}>
              <Card
                component="form"
                noValidate
                onSubmit={handleSubmit}
                aria-label={t('booking.formLabel')}
                sx={{ p: { xs: 3, md: 4 } }}
              >
                <Grid container columnSpacing={2.5} rowSpacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field id="booking-name" label={fieldText('name', 'label')} required>
                      <TextField
                        {...textFieldProps('name', {
                          required: true,
                          autoComplete: 'given-name',
                          placeholder: fieldText('name', 'placeholder'),
                        })}
                      />
                    </Field>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field id="booking-surname" label={fieldText('surname', 'label')} required>
                      <TextField
                        {...textFieldProps('surname', {
                          required: true,
                          autoComplete: 'family-name',
                          placeholder: fieldText('surname', 'placeholder'),
                        })}
                      />
                    </Field>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field id="booking-phone" label={fieldText('phone', 'label')} required>
                      <TextField
                        {...textFieldProps('phone', {
                          type: 'tel',
                          required: true,
                          autoComplete: 'tel',
                          placeholder: fieldText('phone', 'placeholder'),
                          // Numbers are typed LTR so "+216 …" keeps its "+" in front in Arabic. `left` is
                          // mirrored to `right` by the RTL cache, so the text still sits on the start side.
                          slotProps: { htmlInput: { inputMode: 'tel', dir: 'ltr' } },
                          sx: { '& input': { textAlign: 'left' } },
                        })}
                      />
                    </Field>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field id="booking-service" label={fieldText('service', 'label')} required>
                      <TextField
                        {...textFieldProps('service', {
                          select: true,
                          required: true,
                          slotProps: {
                            select: {
                              labelId: 'booking-service-label',
                              displayEmpty: true,
                              renderValue: (selected) =>
                                selected ? (
                                  serviceLabel(selected)
                                ) : (
                                  <Box component="span" sx={{ color: 'text.secondary', opacity: 0.8 }}>
                                    {fieldText('service', 'placeholder')}
                                  </Box>
                                ),
                            },
                          },
                        })}
                      >
                        {SERVICE_VALUES.map((value) => (
                          <MenuItem key={value} value={value}>
                            {serviceLabel(value)}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Field>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field id="booking-date" label={fieldText('date', 'label')}>
                      <TextField {...textFieldProps('date', { type: 'date' })} />
                    </Field>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field id="booking-time" label={fieldText('time', 'label')}>
                      <TextField {...textFieldProps('time', { type: 'time' })} />
                    </Field>
                  </Grid>
                  <Grid size={12}>
                    <Field id="booking-message" label={fieldText('message', 'label')}>
                      <TextField
                        {...textFieldProps('message', {
                          multiline: true,
                          rows: 4,
                          placeholder: fieldText('message', 'placeholder'),
                        })}
                      />
                    </Field>
                  </Grid>

                  <Grid size={12}>
                    <FormControl error={Boolean(errors.consent)} required fullWidth>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          bgcolor: 'background.paper',
                          border: 1,
                          borderColor: errors.consent ? 'error.main' : 'divider',
                          borderRadius: '12px',
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              id="booking-consent"
                              name="consent"
                              checked={values.consent}
                              onChange={(event) => update('consent', event.target.checked)}
                              slotProps={{
                                input: {
                                  'aria-required': true,
                                  'aria-invalid': Boolean(errors.consent),
                                  'aria-describedby': errors.consent ? 'booking-consent-helper-text' : undefined,
                                },
                              }}
                            />
                          }
                          label={t('booking.consent')}
                          slotProps={{ typography: { variant: 'body2', sx: { color: 'text.primary' } } }}
                          sx={{ m: 0, width: '100%' }}
                        />
                      </Box>
                      {errors.consent && (
                        <FormHelperText id="booking-consent-helper-text">{t(`booking.errors.${errors.consent}`)}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={submitting}
                      startIcon={<SendRoundedIcon aria-hidden sx={flipInRtl} />}
                      sx={{ py: 1.75 }}
                    >
                      {t('booking.submit')}
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Reveal>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={8000}
        onClose={(_, reason) => reason !== 'clickaway' && closeSnackbar()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%', boxShadow: '0 8px 24px rgba(28,43,74,0.18)' }}
        >
          {t(snackbar.severity === 'success' ? 'booking.success' : 'booking.failure')}
        </Alert>
      </Snackbar>
    </Box>
  );
}
