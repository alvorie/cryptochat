import Style from "./cryptoCard.module.css";

interface Props {
  name: string;
  price: number;
  img: string;
}

export default function CryptoCard({ name, price, img }: Props) {
  return (
    <div className={Style.cryptoCard}>
      <img src={img} alt={name} />
      <p className={Style.cryptoCardTitle}>{name}</p>
      <p>{price} $</p>
    </div>
  );
}
