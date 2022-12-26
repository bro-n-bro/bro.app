export default {
    // English
    en: {
        message: {
            // IPFS
            'ipfs': "Ipfs node",

            // Error page
            'error_title_404': "Page was lost in space....<br> Are you sure that it exist?",

            // Under construction page
            'under_construction_title': "This part of site is under construction",

            // Keplr Error page
            'keplr_error_title': "Oooops, seems you don't have<br> a Keplr extension",
            'keplr_install_btn': "Install Keplr",

            // Buttons
            'connect_wallet_btn': 'Connect wallet',
            'details_btn': 'Details',
            'manage_btn': 'Manage',
            'delegate_btn': 'Delegate to your Bro',
            'back_home_btn': 'Back to home',
            'update_btn': 'Update',

            // Dashboard
            'personal_apr': 'Personal APR',
            'RPDE': 'RPDE',

            // Notofications
            'notice_default': 'Bro_n_Bro foundation has come to light at early 2021 as a Validator for Cosmos Ecosystem. Some time after we started relaying and expanding other services to networks and projects.',

            'ipfs_active_notice': "The IPFS node is built in right in your browser. It helps store and resolves the content from the distributed storage. NFTs, moon passports, ENS, with contents address, can be resolved right here. It is green because the IPFS node is active and resolves the content.",
            'ipfs_not_active_notice': "The IPFS node is built in right in your browser. It helps store and resolves the content from the distributed storage. NFTs, moon passports, ENS, with contents address, can be resolved right here. It is red because the IPFS node is inactive and not resolves the content.",

            'currency_notice': "The currency for the account valuation",
            'username_notice': "Chosen keplr account",
            'avatar_notice': "Your Moon passport avatar",

            'network_notice': "The network health is {health}. That's why it's {color}. This parameter is calculated as root from the multiplication of the number of validators that can stop the network and the number of validators that can fork the network. The hex is blinking with frequency is depended on network APR.",
            'network_sum_notice': "The sum of your tokens in {network} network",
            'network_staked_tokens_notice': "The amount of staked tokens is {value} {denom}",
            'network_liquid_tokens_notice': "The amount of liquid tokens is {value} {denom}",
            'network_rewards_tokens_notice': "The amount of ready-to-claim reward tokens is {value} {denom}",
            'network_ibc_tokens_notice': "The amount {denom} tokens outside the {network} is {value} {denom}",
            'network_personal_APR_notice': "Your personal APR, given validators commissions",
            'network_RPDE_notice': "Rewards Per Day Estimation. The amount of {denom} tokens you're earning per day.",

            'account_balance_notice': "Your account valuation in the chosen currency",
            'account_personal_APR_notice': "Your personal APR, given validators commissions in all displayed networks.",
            'account_RPDE_notice': "Rewards Per Day Estimation. The number of tokens in the chosen currency you earn per day from all displayed networks.",

            // Manage modal
            'manage_modal_action_delegate': 'Delegate',
            'manage_modal_action_redelegate': 'Redelegate',
            'manage_modal_action_claim': 'Claim',
            'manage_modal_action_restake': 'Restake',

            'manage_modal_validator_name': 'Bro_n_Bro',
            'manage_modal_commission': 'Commission',

            'manage_modal_notice_title': 'Staking will lock up your funds for {unbonding_time} days',
            'manage_modal_claim_notice_title': 'Your claimed rewards will be added<br> to Available Balance.',
            'manage_modal_restake_notice_title': 'You no longer have to manually claim and restake your staking rewards',
            'manage_modal_notice_desc': 'Once you undelegate your staked {currency}, you will need to wait {unbonding_time} days for your tokens to be liquid',
            'manage_modal_restake_notice_desc': 'enabling Restake will allow Bro_n_Bro to auto-compound your staking rewards for you.',

            'manage_modal_my_delegation': 'My delegation',
            'manage_modal_available_balance': 'Available Balance',
            'manage_modal_rewards_balance': 'Pending Rewards',
            'manage_modal_APR': 'APR',
            'manage_modal_APY': 'APY',
            'manage_modal_delegation': 'Delegation',
            'manage_modal_pending_rewards': 'Pending Rewards',
            'manage_modal_frequency': 'Frequency',
            'manage_modal_frequency_val': 'at {frequency} every day',
            'manage_modal_minimum_reward': 'Minimum Reward',

            'manage_modal_delegate_amount': 'Amount to Delegate',
            'manage_modal_redelegate_amount': 'Amount to Redelegate',

            'manage_modal_max_btn': 'MAX',

            'manage_modal_validator_delegate_label': 'Validator to Delegate',
            'manage_modal_validator_redelegare_label': 'Validator from Redelegate',

            'manage_modal_validator_placeholder': 'Name Validator',
            'manage_modal_grant_amount_placeholder': 'Unlimited',

            'manage_modal_validator_exp': 'Delegating to Bro_n_Bro will open all application features',
            'manage_modal_amount_exp': '{value} {currency} is reserved for transaction fees',

            'manage_modal_grant_label_status': 'Grant Status',
            'manage_modal_grant_label_remaining': 'Grant Remaining',
            'manage_modal_grant_status_inactive': 'Inactive',
            'manage_modal_grant_status_active': 'Active',
            'manage_modal_grant_expiry': 'expires {date}',
            'manage_modal_grant_remaining': 'Unknown',
            'manage_modal_grant_remaining_unlimited': 'Unlimited',

            'manage_modal_grant_text1': 'Bro_n_Bro will be able to carry out the following transactions on your behalf',
            'manage_modal_grant_text2': '<b style="color: #fff;">Delegate</b> — allowed to delegate any amount to only their own validator',
            'manage_modal_grant_text3': 'This grant will expire automatically on {date}',
            'manage_modal_grant_text4': 'REStake only re-delegates Bro_n_Bro’s accrued rewards and tries not to touch your balance',

            'manage_modal_grant_label_amount': 'Max amount',
            'manage_modal_grant_label_expiry': 'Expiry date',

            'manage_modal_grant_amount_exp': 'Reduces with every delegation made by the validator. Leave empty for unlimited',
            'manage_modal_grant_expiry_exp': 'Date the grant will expire. After this date you will need to re-grant',

            'manage_modal_delegate_btn': 'Delegate',
            'manage_modal_redelegate_btn': 'Redelegate',
            'manage_modal_claim_all_btn': 'Claim all',
            'manage_modal_enable_restake_btn': 'Enable Restake',
            'manage_modal_disable_restake_btn': 'Disable Restake',
            'manage_modal_manage_grant_btn': 'Manage Grant',
            'manage_modal_success_back_btn': 'Got it!',
            'manage_modal_again_btn': 'Try again!',

            'manage_modal_success_title': "<a href='https://www.mintscan.io/{network}/txs/{hash}' target='_blank' rel='noopener nofollow'>Transaction</a><br> is successfully broadcasted",

            'manage_modal_error_2': "tx parse error",
            'manage_modal_error_3': "invalid sequence",
            'manage_modal_error_4': "unauthorized",
            'manage_modal_error_5': "insufficient funds",
            'manage_modal_error_6': "unknown request",
            'manage_modal_error_7': "invalid address",
            'manage_modal_error_8': "invalid pubkey",
            'manage_modal_error_9': "unknown address",
            'manage_modal_error_10': "invalid coins",
            'manage_modal_error_11': "Broadcasting transaction failed: out of gas try again and increase gas amount",
            'manage_modal_error_12': "memo too large",
            'manage_modal_error_13': "insufficient fee",
            'manage_modal_error_14': "maximum number of signatures exceeded",
            'manage_modal_error_15': "no signatures supplied",
            'manage_modal_error_16': "failed to marshal JSON bytes",
            'manage_modal_error_17': "failed to unmarshal JSON bytes",
            'manage_modal_error_18': "invalid request",
            'manage_modal_error_19': "tx already in mempool",
            'manage_modal_error_20': "mempool is full",
            'manage_modal_error_21': "tx too large",
            'manage_modal_error_22': "key not found",
            'manage_modal_error_23': "invalid account password",
            'manage_modal_error_24': "tx intended signer does not match the given signer",
            'manage_modal_error_25': "invalid gas adjustment",
            'manage_modal_error_26': "invalid height",
            'manage_modal_error_27': "invalid version",
            'manage_modal_error_28': "invalid chain-id",
            'manage_modal_error_29': "invalid type",
            'manage_modal_error_30': "tx timeout height",
            'manage_modal_error_31': "unknown extension options",
            'manage_modal_error_32': "incorrect account sequence",
            'manage_modal_error_33': "failed packing protobuf message to Any",
            'manage_modal_error_34': "failed unpacking protobuf message from Any",
            'manage_modal_error_35': "internal logic error",
            'manage_modal_error_36': "conflict",
            'manage_modal_error_37': "feature not supported",
            'manage_modal_error_38': "not found",
            'manage_modal_error_39': "Internal IO error",
            'manage_modal_error_40': "error in app.toml",
            'manage_modal_error_41': "invalid gas limit",

            'manage_modal_error_rejected': "The transaction has been rejected",


            // Feedback
            'feedback_title': 'Report a bug here',
            'feedback_desc': 'Share it with us',
            'feedback_telegram_link': 'Telegram',
            'feedback_github_link': 'Github',


            // Footer
            'footer_contact': 'Contact',
            'footer_support': 'Support'
        }
    }
}