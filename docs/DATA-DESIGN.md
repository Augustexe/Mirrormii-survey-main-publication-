# Lark data and agent design — proposal

The founder wants survey answers, users, and account information hosted in Lark Base. This intent is confirmed. This document is a logical proposal; no live Lark connection or tenant schema was verified in this session, and this project has not provisioned a survey table.

## Ownership and transport

Company reference data remains in MirrorMii OS and the canonical Wiki. The new survey dataset needs its own explicit destination and access rules. Do not mix public respondent data into Product Truths or brand-canon tables.

Evaluate a server-side API between the public website and Lark. The browser must not receive a Lark app credential. A visitor identity is not a Lark employee identity. Account profile data can live in Lark; login secrets, sessions, and recovery mechanisms need a deliberate authentication design.

**Open architectural choice:** direct acknowledged writes to Lark for a bounded pilot, or durable queued intake with Lark synchronization for burst tolerance. The latter requires explicit agreement about temporary storage outside Lark. Neither option is selected. Precise tenant and API limits are unverified.

## Logical entities

| Entity | Minimum purpose/fields | Boundary |
| --- | --- | --- |
| Participant | pseudonymous ID, optional account reference, creation time | No unnecessary profile details |
| Account profile | identity-provider reference if selected, contact preferences, verified contact status | No plaintext passwords or tokens in Base/Git |
| Consent record | participant, purpose/version, affirmative choice, time, withdrawal | Separate questionnaire, optional sensitive data, and marketing purposes |
| Survey definition | version, question IDs, options, branching, scoring version, result-copy version | Released versions immutable |
| Submission | stable ID, participant/session, survey version, state, timestamps | Idempotency at logical submission level |
| Answers | submission, versioned question IDs, selected values and explicit missing state | One document/row or normalized records still to choose |
| Result | submission, scoring version, dimension values, result ID, explanation version | Reproducible and separate from public card |
| Shared result | opaque share ID, approved result projection, expiry/revocation if selected | Excludes contact and raw health answers |
| Referral attribution | referral ID, campaign/partner, visit/submission reference, eligibility | Avoid raw personal information in links |
| Affiliate conversion | eligible event, attribution version, status, reversal | Server-verified; answer content cannot affect payment eligibility |
| Payout ledger | approved conversion references, amount/currency, status, provider reference | Payout execution is a later separately scoped operation |
| Agent run/audit | purpose, bounded source refs, actor, write intent, idempotency ID, outcome | Metadata without raw sensitive bodies |

These are logical entities, not a command to create 12 tables. Combine physical tables only after query needs, capacity, and permissions are known.

## Intake state proposal

`draft → submitted → durably accepted → synced to Lark`

Record partial/ambiguous outcomes explicitly. If the chosen design writes directly to Lark, durable acceptance and successful Lark persistence may be the same boundary. If queued, the server's accepted response means it has durably retained the submission, not that Lark has already received it.

Use a stable submission ID for retries. An expired request with unknown write outcome enters reconciliation; it must not blindly create again. Backoff, retry counts, rejection behavior, idempotency retention, and outage recovery are build requirements to specify after the API path is verified.

## Scale questions

Lark table and monthly API allowances vary by plan. Verify the actual tenant, endpoint throughput, maximum request/field size, batch sizes, write conflicts, pagination, permission model, deletion behavior, and exports. Do not assume paid “unlimited monthly calls” means unlimited requests per second.

Illustrative row math: 20,000 rows / 30 answer records per completion = 666 complete response sets before overhead. A compact response row reduces row use but changes queryability and may meet field-size limits. This is scenario arithmetic, not our tenant capacity or selected schema.

## Agent roles to specify

- Context reader: current approved company facts and approved survey definitions.
- Survey analyst: bounded pseudonymous or aggregate response data for a named purpose.
- Support operator: minimal participant record needed for a defined support request.
- Write worker: scoped destination/fields, validated payload, stable idempotency key, traceable human authorization, and outcome reconciliation.

No agent gets automatic authority to rewrite released scoring, publish findings, message participants, expand permissions, or pay affiliates. A production app's approved automated write policy can authorize routine actions once defined; avoid manual approval for every normal survey response.

## Validation before production

Exercise duplicate submission, network interruption, ambiguous upstream write, partial batch success, API throttling, queue outage if used, replay after restart, unauthorized result access, share revocation, deletion propagation, and affiliate reversal. Use synthetic fixtures, never real respondent data in GitHub CI.
