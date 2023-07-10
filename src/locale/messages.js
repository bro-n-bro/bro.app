export default {
    // English
    en: {
        message: {
            // Page title
            'page_title': 'Bro APP',


            // Error page
            'error_title_404': 'Page was lost in space....<br> Are you sure that it exist?',


            // Keplr Error page
            'keplr_error_title': "Oooops, it seems you don't have<br> a Keplr extension",
            'keplr_reload_title': 'Please reload the page',


            // Main page
            'main_page_title': 'Create your passport, to unlock the full potential of the features available?',
            'main_page_demo_text': 'For a brief set of instructions, please refer to the',
            'main_page_demo_link': 'Demo',


            // Create passport page
            'passport_avatar_label': 'Upload avatar',
            'passport_avatar_file_size': 'File up to 5 MB',
            'passport_avatar_mimetype_size': 'Only jpg, png',
            'passport_constitution_link': 'read constitution',
            'passport_name_label': 'Nickname',
            'passport_citizenship_label': 'Citizenship',
            'passport_citizenship_text': 'Moon<br> citizen',
            'passport_name_placeholder': 'Choose name',
            'passport_address_exp': 'Address',
            'passport_name_exp': 'Limit 8-16 characters; only a-z, 0-9, "-"',
            'passport_constitution_exp': 'Creating a passport I confirm reading the Constitution',
            'passport_error_nickname_title': 'Nickname misspelled',


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


            // Account
            'account_networks_title': 'Networks',
            'account_abilities_title': 'Abilities',
            'account_validators_title': 'Validators',
            'account_proposals_title': 'Governance',
            'account_connected_addresses_title': 'My Portfolio',

            'account_connected_addresses_all': 'View all',

            'account_charts_tab_stake': 'Stake',
            'account_charts_tab_liquide': 'Liquid',
            'account_charts_tab_assets': 'Assets',
            'account_charts_tab_networks': 'Networks',
            'account_charts_tab_accounts': 'Accounts',

            'account_chart_stake_block_title': 'Stake Management',
            'account_chart_stake_desc': 'contain staked, liquid and unbonding tokens',

            'account_chart_liquide_block_title': 'Liquid Management',
            'account_chart_liquide_desc': 'contain liquid, rewards and IBC tokens',

            'account_chart_networks_block_title': 'Network Management',
            'account_chart_networks_desc': 'represent all networks in portfolio',

            'account_chart_assets_block_title': 'Asset Management',
            'account_chart_assets_desc': 'represent all tokens in portfolio',

            'account_chart_accounts_block_title': 'Account Management',
            'account_chart_accounts_desc': 'contain your linked accounts',

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

            'account_copy_tooltip': 'Address copied',
            'account_duplicate_ext': 'Duplicate address',
            'account_not_supported_ext': 'Not supported',


            // Filter
            'filter_title': 'Filter',


            // Demo notice
            'demo_notice_text': 'Demo Mode',
            'demo_notice_link': 'Create passport',


            // Footer
            'footer_contact': 'Contact',
            'footer_support': 'Support',


            // Feedback
            'feedback_title': 'Report a bug here',
            'feedback_desc': 'Share it with us',
            'feedback_telegram_link': 'Telegram',
            'feedback_github_link': 'Github',


            // Notofications
            'notice_default_main_page': 'Welcome to the best Cosmos managing tool.',
            'notice_default_create_passport': 'To create your passport, please ensure that you upload the information correctly. Then you will be asked to sign the transaction.',
            'notice_default_create_passport_success': 'Congrats! You have successfully created a Passport. You can now continue the journey and explore the app in BETA 2.0.',
            'notice_default_constitution_modal': "By clicking 'Agree & Sign' you confirm that you have read the Constitution in full and wish to create a passport. After clicking 'Agree & Sign' you will be asked to sign the transaction.",
            'notice_default_account_passport': 'That’s your recently created passport. You can now change the image or download the passport.',
            'notice_default_proposals_page': 'All proposals including proposals in Deposit period can be found on this page.',
            'notice_default_account_page': 'Welcome to our portfolio management tool. Take control of your investments and optimize your portfolio for maximum returns.',
            'notice_default_proposal_page': 'Detailed overview for the selected proposal.',

            'notice_ipfs_active': "The IPFS node is built in right in your browser. It helps store and resolves the content from the distributed storage. NFTs, moon passports, ENS, with contents address, can be resolved right here. It is green because the IPFS node is active and resolves the content.",
            'notice_ipfs_not_active': "The IPFS node is built in right in your browser. It helps store and resolves the content from the distributed storage. NFTs, moon passports, ENS, with contents address, can be resolved right here. It is red because the IPFS node is inactive and not resolves the content.",

            'notice_currency': "The currency for the account valuation",
            'notice_username': "Chosen keplr account",
            'notice_avatar': "Your Moon passport avatar",

            'notice_delete_address': 'To Delete linked account please press on “delete icon” for selected address and then confirm your actions.',
            'notice_edit_address': 'To Edit linked account please press on “edit icon” for selected address and then confirm your actions.',
            'notice_copy_address': 'To Copy linked account please press on “copy icon” for selected address.',

            'notice_account_charts_tab_stake': 'The Stake Management tab shows how many staked, liquid, and unbonding tokens you have in your account, providing a comprehensive view of your current staking activity.',
            'notice_account_charts_tab_liquide': 'The Liquid Management tab shows all of your liquid tokens for the selected networks, on both Outside and IBC channels, providing a detailed overview of your current holdings.',
            'notice_account_charts_tab_assets': 'The Asset Management tab represents all networks and offers a complete view of your entire portfolio',
            'notice_account_charts_tab4': 'The Network Management tab represents the value of all tokens in your portfolio and provides a complete overview on network level. ',
            'notice_account_charts_tab_accounts': 'The Account Management tab provides a detailed breakdown of all your linked accounts, offering a complete overview for each.',


            // IPFS
            'ipfs': 'Ipfs node',


            // Constitution modal
            'constitution_modal_title': 'Constitution',


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


            // Notofications
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


            // Buttons
            'btn_back_home': 'Back to home',
            'btn_reload': 'Reload',
            'btn_connect_wallet': 'Сonnect wallet',
            'btn_reject': 'Reject',
            'btn_confirm': 'Confirm',
            'btn_agree_sign': 'Agree & Sign',
            'btn_keplr_install': 'Install Keplr',
            'btn_add_address': 'Add address',
            'btn_use_new_passport': 'Use new passport',
            'btn_next': 'Next',
            'btn_sign': 'Sign',
            'btn_sing_broadcast': 'Sing and broadcast',
            'btn_done': 'Done',
            'btn_see_more': 'See more',
            'btn_no': 'No',
            'btn_yes': 'Yes',
            'btn_download_png': 'Dowloand png',
            'btn_continue': 'Continue journey',
            'btn_update': 'Update',
            'btn_change_image': 'Change image',
            'btn_settings': 'Setting',
        }
    }
}