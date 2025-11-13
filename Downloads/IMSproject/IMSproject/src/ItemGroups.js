import React from 'react';
import './ItemGroups.css'; 

const ItemGroups = ({ itemGroups }) => {
  if (!itemGroups) {
    return <div>No item groups available</div>;
  }

  return (
    <div className="item-groups-wrapper">
      <table className="item-groups-table">
        <thead>
          <tr>
            <th>Item Groups</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(itemGroups).map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              <tr>
                <td className="group-header">{group}</td>
                <td></td>
              </tr>
              {itemGroups[group].map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td></td>
                  <td>{item.productName}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemGroups;
