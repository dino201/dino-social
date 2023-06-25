import './accountItem.scss';

function AccountItem({ data }) {
    return (
        <div className='accountItem'>
            <img src={'/upload/' + data?.profilePic} alt='' />
            <div className='info'>
                <h4 className='name'>{data && data.name}</h4>
                <p>Bạn bè</p>
            </div>

            {/* <img src={'/upload/' + data?.profilePic} alt='' /> */}
        </div>
    );
}

export default AccountItem;
