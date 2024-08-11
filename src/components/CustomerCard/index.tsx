import React from "react";
import { ICustomer } from "../../core/models";
interface ICustomerCardProps {
  customer: ICustomer;
  active: boolean;
  onClick: (e: ICustomer) => void;
}
const CustomerCard = (props: ICustomerCardProps) => {
  return (
    <div
      className={props.active ? "customer-card active" : "customer-card"}
      onClick={() => props.onClick(props.customer)}
    >
      <h3>{props.customer.user.name.first}</h3>
      <p>{props.customer.user.username}</p>
    </div>
  );
};
export default CustomerCard;
