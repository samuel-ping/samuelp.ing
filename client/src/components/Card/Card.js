import { useState } from 'react';

import CardPopup from '@components/Card/CardPopup';

export default function Card({ info }) {
  const [modalVisible, toggleModalVisible] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => toggleModalVisible(!modalVisible)}
        className="rounded-lg overflow-hidden shadow-lg bg-white hover:bg-green-100"
      >
        {info.details.thumbnail ? (
          <img
            src={info.details.thumbnail}
            alt={`Thumbnail for ${info.details.title}`}
            className="w-full object-cover"
          />
        ) : (
          <></>
        )}
        <div className="">
          <h2>{info.details.title}</h2>
        </div>
      </button>

      <CardPopup
        visible={modalVisible}
        info={info}
        handleClose={() => toggleModalVisible(!modalVisible)}
      />
    </>
  );
}
