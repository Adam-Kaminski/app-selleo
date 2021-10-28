import * as yup from 'yup';

const calendarEntrySchema = yup.object().shape({
  timeDate1: yup.date().default(null).required(),
  timeDate2: yup
    .date()
    .default(null)
    .required()
    .min(yup.ref('timeDate1'), 'Drugi wybrany czas musi być późniejszy niż pierwszy'),
  bundle: yup.string().default('').required(),
  bundleId: yup.string().default('').required(),
  tag: yup.string().default('').required(),
  timeDate1String: yup.string(),
  timeDate2String: yup.string().default(''),
});

export default calendarEntrySchema;
