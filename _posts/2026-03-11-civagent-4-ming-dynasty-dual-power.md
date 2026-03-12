---
layout: post
title: "CivAgent 系列（四）：明代双轨制——N-Version Programming 的古典实现"
title_en: "CivAgent Series (IV): The Ming Dual-Track System — A Classical Implementation of N-Version Programming"
date: 2026-03-11
tags: [AI, Multi-Agent, Ming Dynasty, Dual Power, CivAgent]
categories: [reading, engineering]
series: civagent
bilingual: true
---

<div class="lang-zh" markdown="1">

**系列导航**：[一：问题的提出](/blog/2026/03/11/civagent-1-history-as-design-patterns/) · [二：六种编排模式](/blog/2026/03/11/civagent-2-six-orchestration-modes/) · [三：唐代三省六部](/blog/2026/03/11/civagent-3-tang-dynasty-quality-gates/) · [四：明代双轨制](./) · [五：雅典民主](/blog/2026/03/11/civagent-5-athens-distributed-knowledge/) · [六：波斯总督制](/blog/2026/03/11/civagent-6-persia-eventual-consistency/) · [七：理论与实现](/blog/2026/03/11/civagent-7-theory-and-implementation/)

---

[上一篇](/blog/2026/03/11/civagent-3-tang-dynasty-quality-gates/)分析了唐代三省六部的质量门控机制。本篇转向另一种截然不同的制衡思路——明代的内阁-司礼监双轨制，以及它与软件工程中 N-Version Programming 的精确对应。

---

## 历史背景：从废相到双轨

朱元璋废丞相后直接管理六部，日均处理奏章超过 200 件，每件平均 100-500 字，每天需要阅读和批复数万字的政务文件。这是一个典型的**信息过载（information overload）问题**。内阁和司礼监的双轨制是对这个问题的制度回应。

```
┌──────────┐              ┌──────────┐
│          │   票拟        │          │
│  内阁    │ ────────────→ │  司礼监  │
│(文官系统) │              │(宦官系统) │
│          │ ←──────────── │          │
│          │   批红/驳回    │          │
└────┬─────┘              └────┬─────┘
     │                         │
     └────────┬────────────────┘
              │
              ▼
         ┌─────────┐
         │  六部执行 │
         └─────────┘
```

---

## 双轨运作的精度

方志远教授在《明代国家权力结构及运行机制》中揭示了双轨制的运作细节<sup>[1]</sup>：

1. 奏章先送内阁 → 内阁大学士阅读后写「票拟」（建议批语贴在奏章上）
2. 票拟连同奏章送司礼监 → 司礼监掌印太监阅读后代皇帝写「批红」
3. 如果司礼监同意票拟 → 照票拟批红，奏章送六部执行
4. 如果司礼监不同意 → 将奏章退回内阁重拟，或直接改写批红

关键是：**内阁和司礼监是两个完全独立的信息处理链路。** 内阁大学士通过科举选拔，代表了文官系统的知识和价值观；司礼监宦官通过宫廷系统培养，代表了完全不同的知识来源和利益视角。两者的系统性偏差（systematic bias）大概率是不相关的——因此，当两者的判断一致时，置信度高；当两者不一致时，就需要进一步审查。

---

## N-Version Programming 的精确映射

这在软件工程中有一个精确的对应物：**N-Version Programming**<sup>[2]</sup>——用 N 个独立团队各自开发同一功能的不同实现，运行时比较 N 个版本的输出，只有当多数版本一致时才采纳结果。

在 AI 编排中，这等价于**用不同的模型（Claude vs GPT vs Gemini）各自独立评估同一个方案，然后比较它们的判断**：

| 明代双轨 | N-Version Programming | AI 编排 |
|---------|----------------------|---------|
| 内阁（科举出身） | Team A（背景 A） | Claude（Anthropic 训练） |
| 司礼监（宫廷出身） | Team B（背景 B） | GPT（OpenAI 训练） |
| 票拟 vs 批红 | Output A vs Output B | Response A vs Response B |
| 一致→执行 | 一致→采纳 | 一致→高置信度 |
| 不一致→重审 | 不一致→人工仲裁 | 不一致→进一步分析 |

核心价值在于：两个独立链路的系统性偏差（bias）大概率不相关，因此交叉验证能捕获单一链路无法发现的错误。

---

## 万历实验：双轨制的自主运行能力

黄仁宇在《万历十五年》中展示了一个关键事实<sup>[3]</sup>：万历皇帝长达二十年不上朝（1588-1620），但帝国的日常运转并未崩溃——因为内阁和司礼监的双轨机制可以在皇帝缺席的情况下自动运行。

这证明了**双轨制具有一定的自主运行能力**，不完全依赖顶层节点。在 AI 系统中，这意味着：当中央协调器（皇帝/orchestrator）不可用时，双轨制可以退化为「两个独立链路的自动交叉验证」模式继续运行——这是一种**优雅降级**（graceful degradation）。

---

## 辽朝南北面官制：异构双轨

辽朝的南北面官制是双轨制的另一种形态。Wittfogel 和冯家昇（1949）的研究表明<sup>[4]</sup>：

- **北面官**：沿用契丹部落制，管理游牧事务（军事、畜牧、部落关系）
- **南面官**：采用唐制，管理农耕区汉人事务（税收、科举、司法）
- 两套系统并行运行，各自有独立的官僚体系和决策流程

核心洞见是：**当系统需要同时处理两种性质完全不同的任务时，与其强行统一到一套流程，不如让两套专用流程各自运行。**

在 AI 编排中，这对应于**混合架构**——例如：
- 一条 pipeline 处理需要深度推理的任务（调用 o3/DeepSeek reasoner）
- 另一条 pipeline 处理需要快速响应的任务（调用 Kimi/Qwen）
- 两条 pipeline 独立运行但在关键节点交叉验证

---

## 斯巴达双王制：高可用性的古典实现

Cartledge（2003）对斯巴达双王制的研究揭示了另一个维度<sup>[5]</sup>：斯巴达的两个国王分别来自两个不同的王族（Agiad 和 Eurypontid），在战时一人留守一人出征。

这种「冗余领导」设计确保了：即使一个国王战死，另一个国王可以立即接管。这是**高可用性（High Availability）**的古典实现——主备切换（failover）。

在 AI 编排中：
- **主链路**：Claude 处理请求
- **备链路**：GPT 热备，监控主链路的健康状态
- **主链路故障**：备链路立即接管，零停机

---

## 启示总结

1. **独立性是关键**：两条决策链必须真正独立——不同训练数据、不同模型架构、不同系统性偏差
2. **一致性 = 置信度**：两条链路输出一致时，可以高置信度采纳；不一致时，需要人工/第三方仲裁
3. **优雅降级**：双轨制在协调器缺席时仍可自主运行，比纯集权模式更具韧性
4. **异构双轨**：不同类型的任务可以走不同的 pipeline，各自优化，关键节点交叉验证
5. **高可用性**：冗余链路提供 failover 能力

---

**下一篇**：[CivAgent 系列（五）：雅典民主——分布式知识管理系统](/blog/2026/03/11/civagent-5-athens-distributed-knowledge/)

---

**项目地址**：[github.com/LeoLin990405/CivAgent](https://github.com/LeoLin990405/CivAgent)

---

## 参考文献

<small>

[1] 方志远 (2008).《明代国家权力结构及运行机制》. 北京：科学出版社.

[2] Avizienis, A. (1985). "The N-Version Approach to Fault-Tolerant Software." *IEEE Transactions on Software Engineering*, SE-11(12), 1491-1501.

[3] 黄仁宇 (1981).《万历十五年》[*1587, A Year of No Significance*]. New Haven: Yale University Press.

[4] Wittfogel, K. A. & 冯家昇 (1949). *History of Chinese Society: Liao (907–1125)*. New York: Macmillan.

[5] Cartledge, P. (2003). *The Spartans: The World of the Warrior-Heroes of Ancient Greece*. New York: Vintage.

</small>

</div>

<div class="lang-en" markdown="1">

**Series Navigation**: [I: Posing the Question](/blog/2026/03/11/civagent-1-history-as-design-patterns/) · [II: Six Orchestration Modes](/blog/2026/03/11/civagent-2-six-orchestration-modes/) · [III: Tang Dynasty Three Departments](/blog/2026/03/11/civagent-3-tang-dynasty-quality-gates/) · [IV: Ming Dual-Track System](./) · [V: Athenian Democracy](/blog/2026/03/11/civagent-5-athens-distributed-knowledge/) · [VI: Persian Satrapy System](/blog/2026/03/11/civagent-6-persia-eventual-consistency/) · [VII: Theory and Implementation](/blog/2026/03/11/civagent-7-theory-and-implementation/)

---

The [previous article](/blog/2026/03/11/civagent-3-tang-dynasty-quality-gates/) analyzed the quality-gate mechanism of the Tang Dynasty's Three Departments and Six Ministries. This article turns to a fundamentally different approach to checks and balances — the Ming Dynasty's Grand Secretariat–Directorate of Ceremonial (Neige–Silijian) dual-track system, and its precise correspondence to N-Version Programming in software engineering.

---

## Historical Background: From Abolishing the Chancellery to Dual Tracks

After Emperor Zhu Yuanzhang (Hongwu Emperor) abolished the position of Chancellor (chengxiang) and began managing the Six Ministries directly, he processed over 200 memorials per day, each averaging 100–500 characters — tens of thousands of characters of administrative documents requiring daily review and response. This was a classic **information overload** problem. The dual-track system of the Grand Secretariat (Neige) and the Directorate of Ceremonial (Silijian) was the institutional response.

```
┌────────────────┐              ┌────────────────┐
│                │   Draft      │                │
│    Grand       │   Reply      │  Directorate   │
│  Secretariat   │ ──────────→  │ of Ceremonial  │
│ (Civil Service)│              │(Eunuch Bureau) │
│                │ ←────────── │                │
│                │  Vermilion   │                │
│                │  Rescript /  │                │
│                │  Rejection   │                │
└───────┬────────┘              └───────┬────────┘
        │                               │
        └──────────┬────────────────────┘
                   │
                   ▼
            ┌────────────┐
            │ Six Ministries │
            │  (Execution)   │
            └────────────┘
```

---

## Precision of Dual-Track Operations

Professor Fang Zhiyuan's *Power Structure and Operating Mechanisms of the Ming State* reveals the operational details of the dual-track system<sup>[1]</sup>:

1. Memorials were first sent to the Grand Secretariat → Grand Secretaries read them and wrote a "draft reply" (piaoni — a suggested rescript affixed to the memorial)
2. The draft reply, together with the memorial, was sent to the Directorate of Ceremonial → the Director of Ceremonial read it and wrote the "vermilion rescript" (pihong) on behalf of the Emperor
3. If the Directorate agreed with the draft reply → the vermilion rescript followed the draft, and the memorial was forwarded to the Six Ministries for execution
4. If the Directorate disagreed → the memorial was returned to the Grand Secretariat for redrafting, or the Directorate directly rewrote the rescript

The critical point: **the Grand Secretariat and the Directorate of Ceremonial constituted two entirely independent information-processing pipelines.** Grand Secretaries, selected through the imperial examination (keju), represented the knowledge and values of the civil service system; Directorate eunuchs, cultivated through the palace system, represented an entirely different knowledge base and set of interests. The systematic biases of the two were, with high probability, uncorrelated — therefore, when their judgments agreed, confidence was high; when they disagreed, further review was warranted.

---

## Precise Mapping to N-Version Programming

This has a precise counterpart in software engineering: **N-Version Programming**<sup>[2]</sup> — N independent teams each develop different implementations of the same function, and at runtime the outputs of all N versions are compared; results are accepted only when a majority of versions agree.

In AI orchestration, this is equivalent to **having different models (Claude vs GPT vs Gemini) independently evaluate the same proposal, then comparing their judgments**:

| Ming Dual Track | N-Version Programming | AI Orchestration |
|----------------|----------------------|-----------------|
| Grand Secretariat (keju-selected) | Team A (Background A) | Claude (Anthropic-trained) |
| Directorate of Ceremonial (palace-trained) | Team B (Background B) | GPT (OpenAI-trained) |
| Draft Reply vs Vermilion Rescript | Output A vs Output B | Response A vs Response B |
| Agreement → Execute | Agreement → Accept | Agreement → High confidence |
| Disagreement → Re-review | Disagreement → Human arbitration | Disagreement → Further analysis |

The core value: the systematic biases of two independent pipelines are, with high probability, uncorrelated; cross-validation can therefore catch errors that a single pipeline would miss.

---

## The Wanli Experiment: Autonomous Operation of the Dual-Track System

Ray Huang's *1587, A Year of No Significance* demonstrates a pivotal fact<sup>[3]</sup>: the Wanli Emperor did not hold court for approximately twenty years (1588–1620), yet the empire's daily operations did not collapse — because the dual-track mechanism of the Grand Secretariat and the Directorate of Ceremonial could run autonomously in the Emperor's absence.

This proves that **the dual-track system possessed a degree of autonomous operational capability**, not entirely dependent on the apex node. In AI systems, this means: when the central coordinator (Emperor / orchestrator) becomes unavailable, the dual-track system can degrade into an "automatic cross-validation between two independent pipelines" mode and continue operating — a form of **graceful degradation**.

---

## The Liao Dynasty's Northern and Southern Administrations: Heterogeneous Dual Tracks

The Liao Dynasty's Northern and Southern Administration system (Nanbeimian Guanzhi) represents another variant of the dual-track paradigm. Research by Wittfogel and Feng Jiasheng (1949) demonstrates<sup>[4]</sup>:

- **Northern Administration (Beimian Guan)**: retained the Khitan tribal system, governing nomadic affairs (military, pastoralism, tribal relations)
- **Southern Administration (Nanmian Guan)**: adopted the Tang system, governing Chinese agricultural affairs (taxation, civil examinations, judiciary)
- The two systems ran in parallel, each with its own independent bureaucracy and decision-making processes

The core insight: **when a system must simultaneously handle two fundamentally different types of tasks, rather than forcing them into a single unified process, it is better to let two specialized processes run independently.**

In AI orchestration, this corresponds to **hybrid architecture** — for example:
- One pipeline handles tasks requiring deep reasoning (invoking o3/DeepSeek reasoner)
- Another pipeline handles tasks requiring fast response (invoking Kimi/Qwen)
- The two pipelines run independently but cross-validate at critical junctures

---

## The Spartan Diarchy: A Classical Implementation of High Availability

Cartledge's (2003) study of the Spartan dual kingship reveals yet another dimension<sup>[5]</sup>: Sparta's two kings came from two different royal houses (Agiad and Eurypontid), and in wartime one remained in the city while the other led the campaign.

This "redundant leadership" design ensured that even if one king fell in battle, the other could assume command immediately. This is a classical implementation of **High Availability** — failover.

In AI orchestration:
- **Primary pipeline**: Claude processes requests
- **Standby pipeline**: GPT on hot standby, monitoring the primary pipeline's health
- **Primary failure**: the standby pipeline takes over immediately, achieving zero downtime

---

## Key Takeaways

1. **Independence is essential**: the two decision chains must be genuinely independent — different training data, different model architectures, different systematic biases
2. **Agreement = Confidence**: when both pipelines produce consistent output, results can be adopted with high confidence; when they disagree, human or third-party arbitration is needed
3. **Graceful degradation**: the dual-track system can operate autonomously when the coordinator is absent, making it more resilient than a purely centralized model
4. **Heterogeneous dual tracks**: different task types can follow different pipelines, each optimized for its domain, with cross-validation at critical nodes
5. **High availability**: redundant pipelines provide failover capability

---

**Next article**: [CivAgent Series (V): Athenian Democracy — A Distributed Knowledge Management System](/blog/2026/03/11/civagent-5-athens-distributed-knowledge/)

---

**Project repository**: [github.com/LeoLin990405/CivAgent](https://github.com/LeoLin990405/CivAgent)

---

## References

<small>

[1] 方志远 (2008).《明代国家权力结构及运行机制》[*Power Structure and Operating Mechanisms of the Ming State*]. 北京：科学出版社 [Beijing: Science Press].

[2] Avizienis, A. (1985). "The N-Version Approach to Fault-Tolerant Software." *IEEE Transactions on Software Engineering*, SE-11(12), 1491-1501.

[3] 黄仁宇 (1981).《万历十五年》[*1587, A Year of No Significance*]. New Haven: Yale University Press.

[4] Wittfogel, K. A. & 冯家昇 [Feng Jiasheng] (1949). *History of Chinese Society: Liao (907–1125)*. New York: Macmillan.

[5] Cartledge, P. (2003). *The Spartans: The World of the Warrior-Heroes of Ancient Greece*. New York: Vintage.

</small>

</div>
