export default {
    // English
    en: {
        message: {
            'page_title': 'Bro APP',


            // IPFS
            'ipfs': 'Ipfs node',


            // Error page
            'error_title_404': 'Page was lost in space....<br> Are you sure that it exist?',


            // Under construction page
            'under_construction_title': 'This part of site is under construction',


            // Mobile plug
            'mobile_plug_title': '',
            'mobile_plug_desc': '',


            // Keplr Error page
            'keplr_error_title': "Oooops, it seems you don't have<br> a Keplr extension",
            'keplr_reload_title': 'Please reload the page',


            // Buttons
            'connect_wallet_btn': 'Сonnect wallet',
            'details_btn': 'Details',
            'manage_btn': 'Manage',
            'delegate_btn': 'Delegate to your Bro',
            'back_home_btn': 'Back to home',
            'update_btn': 'Update',
            'reload_btn': 'Reload',
            'no_btn': 'No',
            'yes_btn': 'Yes',
            'download_png_btn': 'dowloand png',
            'continue_btn': 'continue journey',
            'add_address_btn': 'Add address',
            'settings_btn': 'Setting',
            'change_image_btn': 'Change image',
            'update_btn': 'Aprove with tx',
            // 'account_btn': 'Account',
            // 'back_btn': 'Back',
            'load_more_btn': 'Load more',
            'next_btn': 'Next',
            'sign_btn': 'Sign',
            'sing_broadcast_btn': 'Sing and broadcast',
            'done_btn': 'Done',
            'see_more_btn': 'See more',
            'delete_passport_btn': 'DELETE PASSPORT',
            'keplr_install_btn': 'Install Keplr',
            'reject_btn': 'Reject',
            'confirm_btn': 'Confirm',
            'agree_sign_btn': 'Agree & Sign',
            'refresh_btn': 'Refresh',
            'deposit_btn': 'Deposit',
            'use_new_passport_btn': 'Use new passport',
            'send_btn': 'Send',


            // Main page
            'main_page_title': 'Welcome<br> to the Bro App',
            // 'main_page_desc': 'Bro will help decompose active',


            // Make a choice
            'choice_title': 'Create your passport, to unlock the full potential of the features available?',

            // Dashboard
            'personal_apr': 'Personal APR',
            'RPDE': 'RPDE',


            // Create passport
            'passport_avatar_label': 'Upload avatar',
            'passport_avatar_file_size': 'File up to 5 MB',
            'passport_avatar_mimetype_size': 'Only jpg, png',
            'passport_constitution_link': 'read constitution',
            'passport_name_label': 'Nickname',
            'passport_citizenship_label': 'Citizenship',
            'passport_citizenship_text': 'Moon<br> citizen',
            'passport_name_placeholder': 'Choose name',
            'passport_address_exp': 'Address',
            'passport_name_exp': 'Min 8 characters',
            'passport_constitution_exp': 'Creating a passport I confirm reading the Constitution',
            'passport_activation_label': 'я крутой',


            // Proposals
            'proposal_date_label_default': 'Voting ended:',
            'proposal_deposite_label_collected': 'Collected funds:',
            'proposal_deposite_label_necessary': 'Necessary funds:',
            'proposal_voting_label_yes': 'Yes',
            'proposal_voting_label_no': 'No',
            'proposal_voting_label_nwv': 'NWV',
            'proposal_voting_label_abstain': 'Abstain',


            // Notofications
            'notice_default_main_page': 'Welcome to the best Cosmos managing tool.',
            'notice_default_dashboard': 'Welcome to our portfolio management tool. Take control of your investments and optimize your portfolio for maximum returns.',
            'notice_default_create_passport': 'To create your passport, please ensure that you upload the information correctly. Then you will be asked to sign the transaction.',
            'notice_default_create_passport_success': 'Congrats! You have successfully created a Passport. You can now continue the journey and explore the app in BETA 2.0.',
            'notice_default_constitution_modal': "By clicking 'Agree & Sign' you confirm that you have read the Constitution in full and wish to create a passport. After clicking 'Agree & Sign' you will be asked to sign the transaction.",
            'notice_default_account_passport': 'That’s your recently created passport. You can now change the image or download the passport.',
            'notice_default_proposals_page': 'All proposals including proposals in Deposit period can be found on this page.',
            'notice_default_account_page': 'Welcome to our portfolio management tool. Take control of your investments and optimize your portfolio for maximum returns.',
            'notice_default_proposal_page': 'Detailed overview for the selected proposal.',

            'ipfs_active_notice': "The IPFS node is built in right in your browser. It helps store and resolves the content from the distributed storage. NFTs, moon passports, ENS, with contents address, can be resolved right here. It is green because the IPFS node is active and resolves the content.",
            'ipfs_not_active_notice': "The IPFS node is built in right in your browser. It helps store and resolves the content from the distributed storage. NFTs, moon passports, ENS, with contents address, can be resolved right here. It is red because the IPFS node is inactive and not resolves the content.",

            'currency_notice': "The currency for the account valuation",
            'username_notice': "Chosen keplr account",
            'avatar_notice': "Your Moon passport avatar",

            'network_notice': "The network health is {health}. That's why it's {color}. This parameter is calculated as root from the multiplication of the number of validators that can stop the network and the number of validators that can fork the network. The hex is blinking with frequency is depended on network APR.",
            'network_sum_notice': "The sum of your tokens in {network} network",
            'network_tokens_notice': "The amount of staked tokens is {delegations_tokens} {denom}. The amount of liquid tokens is {availabel_tokens} {denom}. The amount of ready-to-claim reward tokens is {rewards_tokens} {denom}. The amount {denom} tokens outside the {network} is {ibc_tokens} {denom}",
            'network_personal_APR_notice': "Your personal APR, given validators commissions",
            'network_RPDE_notice': "Rewards Per Day Estimation. The amount of {denom} tokens you're earning per day.",

            'network_lock_notice': "It is greyed out and locked because you don't have tokens in this network. To unlock the network and see the analytics delegate tokens to your Bro.",
            'network_lock_notice2': "It is highlighted in white because you have tokens in this network but none of them are delegated to Bro_n_Bro, that's why Network is currently locked. To unlock the network and see the analytics delegate tokens to your Bro.",

            'account_charts_tab1_notice': 'The Stake Management tab shows how many staked, liquid, and unbonding tokens you have in your account, providing a comprehensive view of your current staking activity.',
            'account_charts_tab2_notice': 'The Liquid Management tab shows all of your liquid tokens for the selected networks, on both Outside and IBC channels, providing a detailed overview of your current holdings.',
            'account_charts_tab3_notice': 'The Asset Management tab represents all networks and offers a complete view of your entire portfolio',
            'account_charts_tab4_notice': 'The Network Management tab represents the value of all tokens in your portfolio and provides a complete overview on network level. ',
            'account_charts_tab5_notice': 'The Account Management tab provides a detailed breakdown of all your linked accounts, offering a complete overview for each.',

            'account_balance_notice': "Your account valuation in the chosen currency",
            'account_personal_APR_notice': "Your personal APR, given validators commissions in all displayed networks.",
            'account_RPDE_notice': "Rewards Per Day Estimation. The number of tokens in the chosen currency you earn per day from all displayed networks.",

            'notice_delete_address': 'To Delete linked account please press on “delete icon” for selected address and then confirm your actions.',
            'notice_edit_address': 'To Edit linked account please press on “edit icon” for selected address and then confirm your actions.',

            'notice_add_address_step1': 'Please select a new address in Keplr to be able to link it to the portfolio.',
            'notice_add_address_step2': 'Select the right address that you want to add to the portfolio.',
            'notice_add_address_step2_error': 'The address you have selected already linked to your portfolio, please switch to another account.',
            'notice_add_address_step3': 'To approve selected address and confirm the change you need to sign a transaction.',
            'notice_add_address_step4': 'To complete the process, you need to switch to your passport account in Keplr.',
            'notice_add_address_step5': 'To finish the process and finalize adding a new account please sign a broadcast transaction.',
            'notice_add_address_success': 'You have successfully added new wallet address to your portfolio.',


            // Manage modal
            'manage_modal_action_delegate': 'Delegate',
            'manage_modal_action_redelegate': 'Redelegate',
            'manage_modal_action_claim': 'Claim',
            'manage_modal_action_restake': 'Restake',
            'manage_modal_action_deposit': 'Deposit',

            'manage_modal_validator_name': 'Bro_n_Bro',
            'manage_modal_commission': 'Commission',
            'manage_modal_commission_sep': '-',

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
            'manage_modal_restake_authz_exp': 'Ledger is expected in the near future.',

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


            // Deposit modal
            'deposit_modal_title': 'Deposit',
            'deposit_modal_sender_label': 'Sender',
            'deposit_modal_amount_label': 'Amount available',


            // Constitution modal
            'constitution_modal_title': 'Constitution',


            // Account
            'account_networks_title': 'Networks',
            'account_abilities_title': 'Abilities',
            'account_validators_title': 'Validators',
            'account_proposals_title': 'Governance',
            'account_connected_addresses_title': 'My Portfolio',

            'account_connected_addresses_all': 'View all',

            'account_charts_tab1': 'Stake',
            'account_charts_tab2': 'Liquid',
            'account_charts_tab3': 'Assets',
            'account_charts_tab4': 'Networks',
            'account_charts_tab5': 'Accounts',

            'account_charts_block_title1': 'Stake Management',
            'account_charts_desc1': 'contain staked, liquid and unbonding tokens',

            'account_charts_block_title2': 'Liquid Management',
            'account_charts_desc2': 'contain liquid, rewards and IBC tokens',

            'account_charts_block_title3': 'Network Management',
            'account_charts_desc3': 'represent all networks in portfolio',

            'account_charts_block_title4': 'Asset Management',
            'account_charts_desc4': 'represent all tokens in portfolio',

            'account_charts_block_title5': 'Account Management',
            'account_charts_desc5': 'contain your linked accounts',

            'account_charts_staked_label': 'Staked',
            'account_charts_outside_label': 'Outside',
            'account_charts_liquid_tokens_label': 'Liquid',
            'account_charts_unbonding_label': 'Unbondend',
            'account_charts_ibc_label': 'IBC Tokens',
            'account_charts_rewards_label': 'Rewards',
            'account_charts_on_chain': 'On',

            'account_charts_total_assets': 'Total Assets',

            'account_validators_col_account_name': 'Account name',
            'account_validators_col_network': 'Network',
            'account_validators_col_validator': 'Validator',
            'account_validators_col_account_percent': 'Account %',
            'account_validators_col_passport_percent': 'Passport %',
            'account_validators_empty_text': 'You have no active validators',

            'account_proposals_col_network': 'Network',
            'account_proposals_col_name': 'Proposal name',
            'account_proposals_col_type': 'Type',
            'account_proposals_col_status': 'Status',

            'account_proposals_status_all': 'All proposals',
            'account_proposals_status_deposite': 'Deposit period',
            'account_proposals_status_voting': 'Voting period',
            'account_proposals_status_passed': 'Passed',
            'account_proposals_status_rejected': 'Rejected',

            'account_RPDE': 'Daily profit',
            'account_APR': 'Personal APR',
            'account_rewards': 'Rewards',
            'account_passport_value': 'Passport Value',

            'account_duplicate_ext': 'Duplicate Address',
            'account_not_supported_ext': 'Not supported',


            // Proposal page
            'proposal_proposer_label': 'Proposer',
            'proposal_tab1': 'Proposal data',
            'proposal_tab2': 'Votes',
            'proposal_desc_title': 'Description',
            'proposal_current_account_title': 'Account:',
            'proposal_current_vote_title': 'Your current vote:',
            'proposal_deposit_status_title': 'Deposit status',
            'proposal_details_title': 'Proposal Details',
            'proposal_vote_details_title': 'Vote details',

            'proposal_details_voting_label': 'Voting End Time',
            'proposal_details_deposit_label': 'Deposit End Time',
            'proposal_details_submit_label': 'Submit Time',
            'proposal_details_total_label': 'Total Deposit',
            'proposal_details_initial_label': 'Initial Deposit',

            'proposal_add_vote_exp': 'You need to change your Keplr account',

            'proposal_vote_info_final_status_label': 'Final Status',
            'proposal_vote_info_current_status_label': 'Current Status',
            'proposal_vote_info_status_passed': 'Passed',
            'proposal_vote_info_status_rejected': 'Rejected',
            'proposal_vote_info_status_passing': 'Passing',
            'proposal_vote_info_status_rejecting': 'Rejecting',
            'proposal_vote_info_turnout_label': 'Turnout',
            'proposal_vote_info_total_vote_label': 'Total Vote',
            'proposal_vote_info_minimum': 'Minimum of staked {amount} {denom} (40%) need to vote for this proposal to pass',

            'proposal_vote_yes_btn': 'Yes',
            'proposal_vote_no_btn': 'No',
            'proposal_vote_nwv_btn': 'No with veto',
            'proposal_vote_abstain_btn': 'Abstain',

            'proposal_vote_result_no_vote_label': 'Not voted',
            'proposal_vote_result_yes_label': 'yes',
            'proposal_vote_result_no_label': 'no',
            'proposal_vote_result_nwv_label': 'nwv',
            'proposal_vote_result_abstain_label': 'abstain',
            'proposal_vote_result_votes_label': 'votes',

            'proposal_feature_height_label': 'Height',
            'proposal_feature_info_label': 'Info',
            'proposal_feature_name_label': 'Name',
            'proposal_feature_time_label': 'Time',
            'proposal_feature_changes_key_label': 'Key',
            'proposal_feature_changes_subspace_label': 'Subspace',
            'proposal_feature_changes_value_label': 'Value',

            'proposal_votes_filter_all': 'All',
            'proposal_votes_filter_yes': 'Yes',
            'proposal_votes_filter_no': 'No',
            'proposal_votes_filter_nwv': 'No with veto',
            'proposal_votes_filter_abstain': 'Abstain',
            'proposal_votes_filter_null': 'Did not vote',

            'proposal_votes_th_validator': 'Validator',
            'proposal_votes_th_validator_vote': 'Validator Vote',
            'proposal_votes_th_most_voted': 'Most voted on',
            'proposal_votes_th_community_votes': 'Community Votes',

            'proposal_depositors_title': 'Depositors',
            'proposal_depositors_th_depositor': 'Depositor',
            'proposal_depositors_th_tx_hash': 'TxHash',
            'proposal_depositors_th_amount': 'Amount',
            'proposal_depositors_th_time': 'Time',


            // Add proposal modal
            'add_proposal_modal_title': 'Create Proposal',
            'add_proposal_label_type': 'Choose type',
            'add_proposal_label_title': 'Title',
            'add_proposal_label_descriptin': 'Description',
            'add_proposal_label_deposit': 'Deposit',
            'add_proposal_submit_btn': 'Create Governance',

            'add_proposal_type_Text': 'Text Proposal',
            'add_proposal_type_ParameterChange': 'Parameter Change',
            'add_proposal_type_CommunityPoolSpend': 'Community Pool Spend',
            'add_proposal_type_UpdateSmartContract': 'Update Smart Contract',
            'add_proposal_type_SoftwareUpgrade': 'Software Upgrade',


            // Validator modal
            'validator_modal_title': 'Validator details',

            'validator_modal_website_btn': 'Website',
            'validator_modal_mintscan_btn': 'Mintscan',
            'validator_modal_broscore_btn': 'Bro Score',

            'validator_modal_active_set': 'Active',
            'validator_modal_inactive_set': 'Inactive',

            'validator_modal_operator_address_label': 'Operator Address',
            'validator_modal_details_label': 'Details',

            'validator_modal_commission_label': 'Commission',
            'validator_modal_ownership_label': 'Self Bonded/<br>Ownership',
            'validator_modal_total_delegated_label': 'Total delegated amount',
            'validator_modal_voted_label': 'Props voted',
            'validator_modal_blurring_label': 'Tokens blurring',

            'validator_modal_col_greed_notice': "The percentage of validator's commision.",
            'validator_modal_col_self_bonded_ownership_notice': 'The number of tokens delegated to yourself. The ratio of the number of tokens delegated to yourself to the total number of delegations.',
            'validator_modal_col_voted_notice': 'This criterion is about the number of votes ({voted}) for the last 5 ended proposals.',
            'validator_modal_col_total_delegated_notice': 'Total amount of tokens delegated to the validator',
            'validator_modal_col_blurring_notice': 'This criterion shows how many tokens were lost by the validator on the slashing in fractions.',


            // Add address modal
            'add_address_modal_title': 'Add new account',
            'add_address_modal_error_desc': 'To add a new address — select a different Keplr account',
            'add_address_modal_error_desc2': 'This wallet is already added to portfolio',
            'add_address_modal_error_desc3': 'This wallet has its own unique passport',

            'add_address_modal_step1_name': 'Choose Address',
            'add_address_modal_step2_name': 'Approve Address',
            'add_address_modal_step3_name': 'Switch Account',
            'add_address_modal_step4_name': 'Accounts Linked',

            'add_address_modal_step1_title': 'Select the address',
            'add_address_modal_step2_title': 'To approve the address you need to sign the transaction.',
            'add_address_modal_step3_title': 'Switch to passport account in Keplr',
            'add_address_modal_step4_title': 'Almost there...',
            'add_address_modal_step5_title': 'Bravo! Congrats!',

            'add_address_added_label': 'Added',
            'add_address_duplicated_label': 'Duplicated',


            // Filter
            'filter_title': 'Filter',


            // Feedback
            'feedback_title': 'Report a bug here',
            'feedback_desc': 'Share it with us',
            'feedback_telegram_link': 'Telegram',
            'feedback_github_link': 'Github',


            // Notification
            'notification_progress_title': 'Transaction is in progress',
            'notification_successful_title': 'Transaction successful',
            'notification_failed_title': 'Transaction failed',
            'notification_explorer_link': 'Explorer',
            'notification_error_file_size_title': 'Error',
            'notification_error_file_size_text': 'Selected image is too large. Please select new < {size}',
            'notification_error_nickName_title': 'Nickname error',
            'notification_error_nickName_desc': 'There is already a passport for this name, come up with a new one',
            'notification_passport_signature': 'Constitution successfully signed',
            'notification_passport_activation_process': 'Account activation...',
            'notification_passport_activation_success': 'Account successfully activated',
            'notification_passport_activation_error': 'Account activation error',
            'notification_passport_activation_error_desc': 'Try again',
            'notification_passport_wait_ipfs': 'Please, wait while local IPFS node is starting.',

            'notification_action_create_passport': 'Create passport',
            'notification_passport_create_process': 'Passport creation...',
            'notification_success_create_passport_title': 'Passport created successfully',
            'notification_error_create_passport_title': 'Passport issue error',

            'notification_action_update_passport': 'Update passport',
            'notification_action_delete_passport': 'Delete passport',
            'notification_passport_update_process': 'Passport updating...',
            'notification_passport_delete_process': 'Passport deleting...',
            'notification_success_update_passport_title': 'Passport updated successfully',
            'notification_success_delete_passport_title': 'Passport delete successfully',
            'notification_error_update_passport_title': 'Passport issue error',

            'notification_action_address_delete': 'Address delete',
            'notification_address_deleting_process': 'Address deleting...',
            'notification_success_address_delete_title': 'Address deleted successfully',

            'notification_action_address_add': 'Address add',
            'notification_address_adding_process': 'Address adding to passport...',
            'notification_success_address_added_title': 'Address added successfully',

            'notification_action_address_rename': 'Address rename',
            'notification_address_renaming_process': 'Address renaming...',
            'notification_success_address_rename_title': 'Address renamed successfully',

            'notification_action_proposal_vote': 'Proposal vote',
            'notification_proposal_vote_process': 'Proposal voiting...',

            'notification_proposal_deposit_process': 'Proposal depositing...',
            'notification_success_proposal_deposit_title': 'Proposal deposit successful',
            'notification_action_proposal_deposit': 'Proposal deposit',


            // Footer
            'footer_contact': 'Contact',
            'footer_support': 'Support'
        }
    }
}