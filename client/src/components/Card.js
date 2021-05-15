import { useState } from 'react';
import Image from 'next/image';

import CardPopup from '@components/CardPopup';

export default function Card({ info }) {
  const [modalVisible, toggleModalVisible] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => toggleModalVisible(!modalVisible)}
        className="p-8 rounded-xl shadow-md bg-white hover:bg-green-100"
      >
        {info.details.thumbnail ? (
          <Image
            src={info.details.thumbnail}
            alt={`Thumbnail for ${info.details.title}`}
          />
        ) : (
          <></>
        )}
        <h2>{info.details.title}</h2>
      </button>

      <CardPopup
        visible={modalVisible}
        info={info}
        handleClose={() => toggleModalVisible(!modalVisible)}
      />
    </>
  );
}
