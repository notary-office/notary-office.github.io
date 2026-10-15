// Settings for the MUI X date and time pickers, per site language.
import 'dayjs/locale/fr';
// Tunisian Arabic: Western digits and the month names used locally (جانفي، فيفري…).
import 'dayjs/locale/ar-tn';
import { enUS, frFR } from '@mui/x-date-pickers/locales';

// MUI X ships no Arabic translation, so the strings the visitor sees or hears are listed here.
const arText = {
  previousMonth: 'الشهر السابق',
  nextMonth: 'الشهر التالي',
  openPreviousView: 'فتح العرض السابق',
  openNextView: 'فتح العرض التالي',
  calendarViewSwitchingButtonAriaLabel: (view) =>
    view === 'year' ? 'عرض السنوات مفتوح، الانتقال إلى التقويم' : 'التقويم مفتوح، الانتقال إلى عرض السنوات',
  cancelButtonLabel: 'إلغاء',
  clearButtonLabel: 'مسح',
  okButtonLabel: 'موافق',
  todayButtonLabel: 'اليوم',
  nextStepButtonLabel: 'التالي',
  datePickerToolbarTitle: 'اختر التاريخ',
  timePickerToolbarTitle: 'اختر الوقت',
  openDatePickerDialogue: (formatted) => (formatted ? `اختر التاريخ، التاريخ المحدد هو ${formatted}` : 'اختر التاريخ'),
  openTimePickerDialogue: (formatted) => (formatted ? `اختر الوقت، الوقت المحدد هو ${formatted}` : 'اختر الوقت'),
  fieldClearLabel: 'مسح القيمة',
  timeTableLabel: 'اختيار الوقت',
  dateTableLabel: 'اختيار التاريخ',
  fieldYearPlaceholder: () => 'سنة',
  fieldMonthPlaceholder: () => 'شهر',
  fieldDayPlaceholder: () => 'يوم',
  fieldHoursPlaceholder: () => 'سا',
  fieldMinutesPlaceholder: () => 'د',
  year: 'السنة',
  month: 'الشهر',
  day: 'اليوم',
  hours: 'الساعات',
  minutes: 'الدقائق',
  empty: 'فارغ',
};

const textOf = (locale) => locale.components.MuiLocalizationProvider.defaultProps.localeText;

export const PICKER_LOCALES = {
  en: { adapterLocale: 'en', localeText: textOf(enUS) },
  fr: { adapterLocale: 'fr', localeText: textOf(frFR) },
  ar: { adapterLocale: 'ar-tn', localeText: arText },
};
