import React, { useEffect, useState } from "react";
import { Smartphone } from "lucide-react";
import { useI18n } from '@/lib/i18n/i18n-context';

export function DeviceInfoSection() {
  const { t } = useI18n();
  const [device, setDevice] = useState({
    userAgent: '',
    platform: '',
    language: '',
    vendor: ''
  });

  useEffect(() => {
    setDevice({
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      platform: typeof navigator !== 'undefined' ? navigator.platform : '',
      language: typeof navigator !== 'undefined' ? navigator.language : '',
      vendor: typeof navigator !== 'undefined' ? navigator.vendor : ''
    });
  }, []);

  return (
    <section className="p-3 sm:p-4 md:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <Smartphone className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{t('deviceinfo.title')}</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('deviceinfo.subtitle')}</p>
        </div>
      </div>
      <ul className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
        <li><span className="font-semibold">{t('deviceinfo.useragent')}:</span> {device.userAgent}</li>
        <li><span className="font-semibold">{t('deviceinfo.platform')}:</span> {device.platform}</li>
        <li><span className="font-semibold">{t('deviceinfo.language')}:</span> {device.language}</li>
        <li><span className="font-semibold">{t('deviceinfo.vendor')}:</span> {device.vendor}</li>
      </ul>
    </section>
  );
}
