import { useState } from 'react';

import ProjectCardPopup from '@components/CardVariants/ProjectCard/ProjectCardPopup';

export default function ProjectCard({ info }) {
  const [modalVisible, toggleModalVisible] = useState(false);

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => toggleModalVisible(!modalVisible)}
        className="min-w-full rounded-lg overflow-hidden shadow-lg transition-colors bg-white hover:bg-green-100"
      >
        {info.details.thumbnail ? (
          <div className="overflow-hidden">
            <img
              src={info.details.thumbnail}
              alt={`Thumbnail for ${info.details.title}`}
              className="w-full object-cover transform scale-125"
            />
          </div>
        ) : (
          <></>
        )}
        <div className="m-3 grid grid-rows-2 grid-cols-1 divide-y ">
          <div>
            <h2 className="text-xl font-bold">{info.details.title}</h2>
            <h3>
              {info.details['start-date']}
              {info.details['end-date'] === info.details['start-date'] ? (
                <></>
              ) : info.details['end-date'] === '' ? (
                ' - Present'
              ) : (
                ` - ${info.details['end-date']}`
              )}
            </h3>
            <h3 className="text-gray-600 italic">
              {/* Regex gratefully snatched from https://beutelevision.com/blog2/2011/06/17/get-the-first-n-words-with-javascript/ */}
              {info.details.technologies.replace(
                /(([^\s]+\s\s*){5})(.*)/,
                '$1…',
              )}
            </h3>
          </div>
          <h3>{info.details['short-description']}</h3>
        </div>
      </button>

      <ProjectCardPopup
        visible={modalVisible}
        info={info}
        handleClose={() => toggleModalVisible(!modalVisible)}
      />
    </div>
  );
}
