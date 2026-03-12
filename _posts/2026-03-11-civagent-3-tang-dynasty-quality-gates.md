---
layout: post
title: "CivAgent 系列（三）：唐代三省六部——质量门控的经典实现"
title_en: "CivAgent Series (III): The Tang Three Departments — A Classic Implementation of Quality Gates"
date: 2026-03-11
tags: [AI, Multi-Agent, Tang Dynasty, Quality Gates, CivAgent]
categories: [reading, engineering]
series: civagent
bilingual: true
---

<div class="lang-zh" markdown="1">

**系列导航**：[一：问题的提出](/blog/2026/03/11/civagent-1-history-as-design-patterns/) · [二：六种编排模式](/blog/2026/03/11/civagent-2-six-orchestration-modes/) · [三：唐代三省六部](./) · [四：明代双轨制](/blog/2026/03/11/civagent-4-ming-dynasty-dual-power/) · [五：雅典民主](/blog/2026/03/11/civagent-5-athens-distributed-knowledge/) · [六：波斯总督制](/blog/2026/03/11/civagent-6-persia-eventual-consistency/) · [七：理论与实现](/blog/2026/03/11/civagent-7-theory-and-implementation/)

---

[第二篇](/blog/2026/03/11/civagent-2-six-orchestration-modes/)概述了 6 种编排模式的类型学。本篇深入分析制衡模式的经典实现——唐代三省六部制，揭示其在 AI Agent 编排中的精确映射。

---

## 历史背景

唐太宗李世民（626-649 在位）是三省六部制的真正完善者。陈寅恪在《唐代政治史述论稿》中指出<sup>[1]</sup>，贞观之治的核心不是李世民个人的英明（虽然他确实英明），而是三省制度确保了「即使皇帝犯错也会被纠正」。著名的例子是魏征——门下省侍中魏征前后封驳了李世民的诏令超过 200 次。

三省六部制的架构：

![唐代三省六部架构图]({{ '/assets/images/civagent3-three-departments.svg' | relative_url }})

这套设计的精妙之处在于：**起草权、审核权、执行权被分离到三个独立的机构**，任何一个环节都无法独自完成整个决策流程。

---

## 三省分离的信息学意义

陈寅恪进一步分析了三省制的运作机理<sup>[1]</sup>。他指出，三省之间的制衡不仅是权力的制衡，更是**信息的制衡**：

- **中书省**负责信息的「编码」——将皇帝的意志转化为可执行的诏令
- **门下省**负责信息的「验证」——检查诏令的合法性、可行性和内部一致性
- **尚书省**负责信息的「解码」——将诏令分解为六部可执行的具体任务

这种「编码→验证→解码」的流程，在现代软件工程中有一个精确的对应物：**编译器的前端（parsing）→ 中端（optimization/validation）→ 后端（code generation）**。

吴宗国教授在《唐代科举制度研究》中进一步发现<sup>[2]</sup>，唐代的科举制度确保三省的官员来自不同的知识背景和社会网络，从而实现了**视角多样性**（perspective diversity）——中书省倾向于政策创新，门下省倾向于法律一致性，尚书省倾向于行政可行性。

---

## Agent 编排映射

| 唐制机构 | Agent 角色 | 职责 | 权限 |
|---------|-----------|------|------|
| 中书省 | Draft Agent (Gemini/Kimi) | 起草方案 | 可创建，不可批准 |
| 门下省 | Review Agent (Claude/Codex) | 审核方案 | 可批准/驳回，不可修改 |
| 尚书省 | Dispatch Agent | 分配任务给六部 | 可分配，不可起草 |
| 吏部 | Personnel Agent | 人员/Agent 管理 | 领域内自主 |
| 户部 | Resource Agent | 资源（token/成本）管理 | 领域内自主 |
| 礼部 | Protocol Agent | 格式规范 | 领域内自主 |
| 兵部 | Execution Agent (Codex/DeepSeek) | 核心执行 | 领域内自主 |
| 刑部 | Validation Agent | 测试验证 | 领域内自主 |
| 工部 | Build Agent (Qwen) | 构建部署 | 领域内自主 |

---

## 三个关键设计点

### 1. 封驳权（Veto Power）

门下省可以驳回中书省的提案并要求重新起草。这不是简单的「yes/no」，而是必须给出**驳回理由**，中书省必须针对驳回理由修改方案后重新提交。

在 AI pipeline 中，这等于 Review Agent 不仅可以 reject，还必须提供 rejection reason，Draft Agent 必须 address 所有 rejection reasons 后才能 re-submit。这比简单的 pass/fail 检查要精细得多——它强制了一个**结构化的反馈循环**。

### 2. 视角多样性

科举制度确保三省的官员来自不同的知识背景。在 AI 编排中，这等价于**用不同特长的模型担任不同角色**：

- Draft Agent 选择创意能力强的模型（Gemini/Kimi）——偏向发散思维
- Review Agent 选择推理能力强的模型（Claude/Codex o3）——偏向收敛判断
- Execute Agent 选择代码能力强的模型（Codex/DeepSeek）——偏向执行精度

两者的系统性偏差大概率是不相关的，因此交叉审核的价值最大。

### 3. 六部的专业化

尚书省下设六部，每个部门有明确的领域边界。这种专业化分工减少了每个节点需要处理的信息量（information overload），符合 Simon 的有限理性理论<sup>[3]</sup>：个体的信息处理能力是有限的，因此有效的组织设计必须将复杂问题分解为可管理的子问题。

---

## 制衡的代价：从唐到宋的退化

唐代三省制的问题在后期暴露——**门下省的封驳权过大，导致决策效率降低**。到了晚唐，中书门下合署办公（「中书门下平章事」），三省制衡实际上被架空。

宋代的回应是「二府三司制」。邓广铭教授在《北宋政治改革家王安石》中详细分析了极致制衡的后果<sup>[4]</sup>：

- 一件涉及军事和财政的事务，需要中书门下、枢密院、三司三方协调
- 三方各有各的信息渠道和利益考量，协调成本极高
- 任何一方都可以通过「封驳」或「台谏」来否决其他方的提案
- 结果是「冗官冗兵」——官员人数膨胀、军队人数膨胀

王安石变法的核心诉求之一就是减少制衡、集中权力以推动改革。但他面临的困境是：**制衡机制一旦建立，受益于现有制衡的利益集团就会强烈抵制任何改变。**

在 AI 系统中，这等价于：一旦引入审核 Agent，移除它的「政治成本」（组织惯性、合规要求、责任分配）远高于当初添加它的成本。**这是一个不可逆的架构决策——三思而后行。**

---

## 启示总结

1. **分离关注点**：起草、审核、执行由不同 Agent 负责，任何单一 Agent 无法独自完成整个流程
2. **结构化反馈**：驳回必须附带理由，修改必须针对理由——不是简单的 retry
3. **视角多样性**：不同角色使用不同特长的模型，最大化交叉审核的价值
4. **专业化分工**：执行层进一步细分为专业子 Agent，减少信息过载
5. **警惕制衡过度**：制衡有成本，且一旦引入难以移除——宋代是前车之鉴

---

**下一篇**：[CivAgent 系列（四）：明代双轨制——N-Version Programming 的古典实现](/blog/2026/03/11/civagent-4-ming-dynasty-dual-power/)

---

**项目地址**：[github.com/LeoLin990405/CivAgent](https://github.com/LeoLin990405/CivAgent)

---

## 参考文献

<small>

[1] 陈寅恪 (1943).《唐代政治史述论稿》. 重庆：商务印书馆.

[2] 吴宗国 (1992).《唐代科举制度研究》. 沈阳：辽宁大学出版社.

[3] Simon, H. A. (1947). *Administrative Behavior: A Study of Decision-Making Processes in Administrative Organization*. New York: Macmillan.

[4] 邓广铭 (1975).《北宋政治改革家王安石》. 北京：人民出版社.

[5] 邓小南 (2006).《祖宗之法：北宋前期政治述略》. 北京：三联书店.

[6] Coase, R. H. (1937). "The Nature of the Firm." *Economica*, 4(16), 386-405.

</small>

</div>

<div class="lang-en" markdown="1">

**Series Navigation**: [I: Posing the Question](/blog/2026/03/11/civagent-1-history-as-design-patterns/) · [II: Six Orchestration Modes](/blog/2026/03/11/civagent-2-six-orchestration-modes/) · [III: The Tang Three Departments](./) · [IV: The Ming Dual-Track System](/blog/2026/03/11/civagent-4-ming-dynasty-dual-power/) · [V: Athenian Democracy](/blog/2026/03/11/civagent-5-athens-distributed-knowledge/) · [VI: The Persian Satrap System](/blog/2026/03/11/civagent-6-persia-eventual-consistency/) · [VII: Theory and Implementation](/blog/2026/03/11/civagent-7-theory-and-implementation/)

---

[Part II](/blog/2026/03/11/civagent-2-six-orchestration-modes/) outlined a typology of six orchestration modes. This installment provides a deep analysis of the classic implementation of the checks-and-balances mode -- the Tang dynasty's Three Departments and Six Ministries system (Sansheng Liubu) -- and reveals its precise mapping to AI agent orchestration.

---

## Historical Background

Emperor Taizong of Tang, Li Shimin (r. 626--649), was the true architect who perfected the Three Departments and Six Ministries system. As Chen Yinke argued in *A Preliminary Discussion of Tang Political History*<sup>[1]</sup>, the core of the Zhenguan Reign's success was not Li Shimin's personal brilliance (though he was indeed brilliant), but rather that the Three Departments system ensured "even the emperor's errors would be corrected." The most famous example is Wei Zheng -- as Vice President of the Chancellery (Menxia Sheng), Wei Zheng vetoed Emperor Taizong's edicts more than 200 times.

The architecture of the Three Departments and Six Ministries:

![Tang Three Departments Architecture]({{ '/assets/images/civagent3-three-departments.svg' | relative_url }})

The elegance of this design lies in the fact that **the powers of drafting, reviewing, and executing were separated into three independent institutions** -- no single link in the chain could complete the entire decision-making process on its own.

---

## The Information-Theoretic Significance of the Tripartite Separation

Chen Yinke further analyzed the operating mechanism of the Three Departments system<sup>[1]</sup>. He observed that the checks and balances among the three departments constituted not merely a balance of *power*, but fundamentally a balance of *information*:

- The **Secretariat** (Zhongshu Sheng) was responsible for "encoding" information -- transforming the emperor's intent into executable edicts
- The **Chancellery** (Menxia Sheng) was responsible for "verifying" information -- checking the legality, feasibility, and internal consistency of edicts
- The **Department of State Affairs** (Shangshu Sheng) was responsible for "decoding" information -- decomposing edicts into concrete tasks executable by the Six Ministries

This "encoding - verification - decoding" pipeline has a precise analogue in modern software engineering: **the compiler frontend (parsing) - middle end (optimization/validation) - backend (code generation)**.

Professor Wu Zongguo, in *A Study of the Tang Dynasty Imperial Examination System*, further discovered<sup>[2]</sup> that the imperial examination system (keju) ensured that officials across the three departments came from diverse knowledge backgrounds and social networks, thereby achieving **perspective diversity** -- the Secretariat tended toward policy innovation, the Chancellery toward legal consistency, and the Department of State Affairs toward administrative feasibility.

---

## Agent Orchestration Mapping

| Tang Institution | Agent Role | Responsibility | Authority |
|---------|-----------|------|------|
| Secretariat (Zhongshu Sheng) | Draft Agent (Gemini/Kimi) | Draft proposals | May create; may not approve |
| Chancellery (Menxia Sheng) | Review Agent (Claude/Codex) | Review proposals | May approve/reject; may not modify |
| Dept. of State Affairs (Shangshu Sheng) | Dispatch Agent | Assign tasks to the Six Ministries | May dispatch; may not draft |
| Ministry of Personnel (Li Bu) | Personnel Agent | Personnel/agent management | Domain-autonomous |
| Ministry of Revenue (Hu Bu) | Resource Agent | Resource (token/cost) management | Domain-autonomous |
| Ministry of Rites (Li Bu) | Protocol Agent | Format and protocol standards | Domain-autonomous |
| Ministry of War (Bing Bu) | Execution Agent (Codex/DeepSeek) | Core execution | Domain-autonomous |
| Ministry of Justice (Xing Bu) | Validation Agent | Testing and verification | Domain-autonomous |
| Ministry of Works (Gong Bu) | Build Agent (Qwen) | Build and deployment | Domain-autonomous |

---

## Three Key Design Points

### 1. The Power of Veto (Fengbo Quan)

The Chancellery could reject the Secretariat's proposals and require redrafting. This was not a simple "yes/no" gate; rather, **a rejection reason was mandatory**, and the Secretariat was required to address the specific rejection reason before resubmitting a revised proposal.

In an AI pipeline, this means the Review Agent must not only be able to reject, but must also provide a rejection reason, and the Draft Agent must address all rejection reasons before it can re-submit. This is far more refined than a simple pass/fail check -- it enforces a **structured feedback loop**.

### 2. Perspective Diversity

The imperial examination system ensured that officials in the three departments came from different knowledge backgrounds. In AI orchestration, this is equivalent to **assigning different roles to models with different strengths**:

- The Draft Agent uses a model strong in creativity (Gemini/Kimi) -- biased toward divergent thinking
- The Review Agent uses a model strong in reasoning (Claude/Codex o3) -- biased toward convergent judgment
- The Execute Agent uses a model strong in code generation (Codex/DeepSeek) -- biased toward execution precision

The systematic biases of the two are most likely uncorrelated, thereby maximizing the value of cross-review.

### 3. Specialization of the Six Ministries

The Department of State Affairs oversaw six ministries, each with clearly defined domain boundaries. This specialization reduced the volume of information each node needed to process (information overload), consistent with Simon's theory of bounded rationality<sup>[3]</sup>: the information-processing capacity of an individual is limited; therefore, effective organizational design must decompose complex problems into manageable sub-problems.

---

## The Cost of Checks and Balances: Degradation from Tang to Song

The problems with the Tang Three Departments system became apparent in the later period -- **the Chancellery's veto power grew too great, leading to declining decision-making efficiency**. By the late Tang, the Secretariat and Chancellery were merged into a joint office ("Zhongshu Menxia Pingzhangshi"), effectively hollowing out the tripartite checks and balances.

The Song dynasty's response was the "Two Councils and Three Commissions" system. Professor Deng Guangming, in *Wang Anshi: Political Reformer of the Northern Song*, provided a detailed analysis of the consequences of extreme checks and balances<sup>[4]</sup>:

- Any matter involving both military and fiscal affairs required coordination among the Secretariat-Chancellery, the Bureau of Military Affairs (Shumiyuan), and the Three Fiscal Commissions (Sansi)
- Each party maintained its own information channels and interest considerations, making coordination costs extremely high
- Any party could veto the others' proposals through "veto" (fengbo) or "censorial remonstrance" (taijian)
- The result was "redundant officials and redundant soldiers" -- a bloating of both the bureaucracy and the military

One of the core demands of Wang Anshi's reforms was to reduce checks and balances and concentrate power to drive reform. But the dilemma he faced was this: **once a checks-and-balances mechanism is established, the interest groups that benefit from the existing balance will strongly resist any change.**

In AI systems, this is equivalent to: once a review agent is introduced, the "political cost" of removing it (organizational inertia, compliance requirements, liability allocation) far exceeds the cost of having introduced it in the first place. **This is an irreversible architectural decision -- think thrice before acting.**

---

## Key Takeaways

1. **Separation of concerns**: Drafting, reviewing, and executing are handled by different agents; no single agent can complete the entire pipeline alone
2. **Structured feedback**: Rejections must include reasons; revisions must address those reasons -- not a simple retry
3. **Perspective diversity**: Different roles use models with different strengths, maximizing the value of cross-review
4. **Specialization**: The execution layer is further subdivided into specialized sub-agents, reducing information overload
5. **Beware of excessive checks and balances**: Checks and balances have costs, and once introduced they are difficult to remove -- the Song dynasty serves as a cautionary tale

---

**Next**: [CivAgent Series (IV): The Ming Dual-Track System — A Classical Implementation of N-Version Programming](/blog/2026/03/11/civagent-4-ming-dynasty-dual-power/)

---

**Project Repository**: [github.com/LeoLin990405/CivAgent](https://github.com/LeoLin990405/CivAgent)

---

## References

<small>

[1] Chen Yinke (1943). *Tangdai Zhengzhi Shi Shulun Gao* [A Preliminary Discussion of Tang Political History]. Chongqing: Commercial Press.

[2] Wu Zongguo (1992). *Tangdai Keju Zhidu Yanjiu* [A Study of the Tang Dynasty Imperial Examination System]. Shenyang: Liaoning University Press.

[3] Simon, H. A. (1947). *Administrative Behavior: A Study of Decision-Making Processes in Administrative Organization*. New York: Macmillan.

[4] Deng Guangming (1975). *Beisong Zhengzhi Gaigejia Wang Anshi* [Wang Anshi: Political Reformer of the Northern Song]. Beijing: People's Publishing House.

[5] Deng Xiaonan (2006). *Zuzong zhi Fa: Beisong Qianqi Zhengzhi Shulue* [The Ancestral Laws: A Brief Political History of the Early Northern Song]. Beijing: SDX Joint Publishing.

[6] Coase, R. H. (1937). "The Nature of the Firm." *Economica*, 4(16), 386-405.

</small>

</div>
