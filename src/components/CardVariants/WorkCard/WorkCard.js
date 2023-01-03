import { useState } from 'react';

import Image from 'next/image';

import WorkCardPopup from '@components/CardVariants/WorkCard/WorkCardPopup';
import RGBStringToDataURL from 'src/utils/RGBStringToDataURL';

export default function WorkCard({ info }) {
  const [modalVisible, toggleModalVisible] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => toggleModalVisible(!modalVisible)}
        className="max-w-xs rounded-xl overflow-hidden shadow-lg transition-colors bg-white hover:bg-green-250"
      >
        {info.details.thumbnail && (
          <div className="relative h-56">
            <Image
              src={info.details.thumbnail}
              alt={`Thumbnail for ${info.details.company}`}
              className="w-full object-contain"
              fill
              placeholder="blur"
              blurDataURL={RGBStringToDataURL(info.details['blur-rgb'])}
            />
          </div>
        )}
        <div className="px-3 py-4">
          <h2 className="text-xl font-bold">{info.details.company}</h2>
          <h3 className="italic">{info.details.title}</h3>
          <h3 className="mb-2">
            {info.details['start-date']}
            {info.details['end-date'] === info.details['start-date'] ? (
              <></>
            ) : info.details['end-date'] === '' ? (
              ' - Present'
            ) : (
              ` - ${info.details['end-date']}`
            )}
          </h3>
          <h3>{info.details['short-description']}</h3>
        </div>
      </button>

      <WorkCardPopup
        visible={modalVisible}
        info={info}
        handleClose={() => toggleModalVisible(!modalVisible)}
      />
    </>
  );
}
