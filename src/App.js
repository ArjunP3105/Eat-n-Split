import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendlist, setfriendlist] = useState([...initialFriends]);
  const [isopenid, setIsopenid] = useState(null);
  const [bill, setbill] = useState({
    total: 0,
    U_expense: 0,
    Friend_expense: 0,
    Paying_user: "you",
  });
  function setId(id) {
    setIsopenid(id);
  }

  function addtolist(friend) {
    setfriendlist((i) => [...i, friend]);
  }

  const selected_friend = friendlist.find((friend) => friend.id === isopenid);
  return (
    <div className="app">
      <Friendlist
        isopenid={isopenid}
        setId={setId}
        setbill={setbill}
        friendlist={friendlist}
        Addtolist={addtolist}
      />
      {selected_friend && (
        <SplitBill
          bill={bill}
          setbill={setbill}
          isopenid={isopenid}
          friend={selected_friend}
          setfriendlist={setfriendlist}
        />
      )}
    </div>
  );
}

function Friendlist({ isopenid, setId, setbill, friendlist, Addtolist }) {
  const [isopen, setisopen] = useState(false);
  const [addfriend, setaddfriend] = useState({
    id: Date.now(),
    name: "",
    image: "",
    balance: 0,
  });
  function Handlesubmit(e) {
    e.preventDefault();
    const newfriend = {
      id: addfriend.id,
      name: addfriend.name,
      image: addfriend.image,
      balance: 0,
    };
    Addtolist(newfriend);
    setaddfriend({ id: "", name: "", image: "", balance: 0 });
  }
  return (
    <div className="sidebar">
      <ul>
        {friendlist.map((friend) => (
          <Friend
            key={friend.id}
            name={friend.name}
            image={friend.image}
            id={friend.id}
            balance={friend.balance}
            isopenid={isopenid}
            setId={setId}
            setbill={setbill}
          />
        ))}
      </ul>
      {isopen || (
        <button className="button" onClick={() => setisopen(true)}>
          Add Friend
        </button>
      )}
      {isopen && (
        <div>
          <form className="form-add-friend" onSubmit={(e) => Handlesubmit(e)}>
            <label>✌︎︎Friend name</label>{" "}
            <input
              type="text"
              value={addfriend.name}
              onChange={(e) =>
                setaddfriend((i) => ({
                  ...i,
                  name: e.target.value,
                  image: `https://i.pravatar.cc/48?u=${i.id}`,
                }))
              }
            ></input>
            <label>📷Image URL</label>{" "}
            <input type="text" value={addfriend.image}></input>
            <button className="button">Add</button>
          </form>
          <button className="button" onClick={() => setisopen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

function Friend({ name, image, id, balance, setId, setbill }) {
  function handleClick(id) {
    setbill({
      total: "",
      U_expense: "",
      Friend_expense: 0,
      Paying_user: "you",
    });
    console.log("Bill state reset");
    setId((i) => (i === id ? null : id));
  }
  return (
    <li>
      <img src={image} alt={name}></img>
      <h3>{name}</h3>
      <p className={balance > 0 ? "green" : balance < 0 ? "red" : ""}>
        {balance < 0
          ? `You owe ${name} ${Math.abs(balance)}$`
          : balance > 0
          ? `${name} owes you ${Math.abs(balance)}$`
          : balance === 0
          ? `You and ${name} are even`
          : ""}
      </p>
      <button className="button" onClick={() => handleClick(id)}>
        Select
      </button>
    </li>
  );
}

function SplitBill({ bill, setbill, friend, setfriendlist }) {
  function account(e) {
    e.preventDefault();
    if (bill.Paying_user === "you")
      setfriendlist((i) =>
        i.map((f) =>
          f.id === friend.id
            ? { ...f, balance: Number(f.balance + bill.Friend_expense) }
            : f
        )
      );

    if (bill.Paying_user === "friend")
      setfriendlist((i) =>
        i.map((f) =>
          f.id === friend.id
            ? { ...f, balance: Number(f.balance - bill.U_expense) }
            : f
        )
      );

    setbill({
      total: "",
      U_expense: "",
      Friend_expense: "",
      Paying_user: "you",
    });
  }
  return (
    <div className="form-split-bill">
      <form className="form-split-bill" onSubmit={(e) => account(e)}>
        <h2>SPLIT A BILL WITH {friend.name} </h2>
        <label>💰Bill Value</label>{" "}
        <input
          min="0"
          value={bill.total}
          type="number"
          onChange={(e) =>
            setbill((i) => ({ ...i, total: Number(e.target.value) }))
          }
        ></input>
        <label>🕺🏻Your Expense</label>{" "}
        <input
          type="number"
          value={bill.U_expense}
          onChange={(e) =>
            setbill((i) => ({
              ...i,
              U_expense: Number(e.target.value),
              Friend_expense: Number(i.total) - Number(e.target.value),
            }))
          }
          max={bill.total}
          min="0"
        ></input>
        <label>🎭{friend.name} expense</label>{" "}
        <input
          max={bill.total}
          type="number"
          value={bill.Friend_expense}
        ></input>
        <label>💵Who is paying the bill ? </label>{" "}
        <select
          value={bill.Paying_user}
          onChange={(Event) =>
            setbill((i) => ({ ...i, Paying_user: Event.target.value }))
          }
        >
          <option value="you">You</option>
          <option value="friend">{friend.name}</option>
        </select>
        <button className="button">Split bill</button>
      </form>
    </div>
  );
}
