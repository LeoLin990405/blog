---
layout: post
title: "当 AI Agent 遇上 Agent-Based Modeling：计算社会科学的范式跃迁"
title_en: "When AI Agents Meet Agent-Based Modeling: A Paradigm Shift in Computational Social Science"
date: 2026-03-16
tags: [AI, Agent-Based Modeling, Computational Social Science, LLM, Generative Agents, ABM]
categories: [essay, reading]
bilingual: true
---

<div class="lang-zh" markdown="1">

> *「如果你不能成长它，你就不能理解它。」*
> *—— Joshua Epstein, "Growing Artificial Societies"*

---

## 一、引言：两个「Agent」的历史性汇合

![ABM Paradigm Shift]({{ '/assets/images/abm-paradigm-shift.svg' | relative_url }})

计算社会科学中存在一个命名上的巧合，而这个巧合正在演变为一次深刻的学科融合。

**Agent-Based Modeling（ABM）** 中的「Agent」——自 Schelling（1971）的隔离模型<sup>[1]</sup>和 Epstein & Axtell（1996）的 Sugarscape<sup>[2]</sup>以来——指的是遵循简单规则的计算实体，它们通过局部交互产生涌现的宏观模式。这些 Agent 没有语言能力，没有记忆，没有推理——它们是数学函数的化身。

**AI Agent**——自 2023 年 Stanford 的 Generative Agents<sup>[3]</sup>以来——指的是由大语言模型（LLM）驱动的自主实体，它们可以用自然语言交流、维护情景记忆、进行反思性推理、制定并执行计划。

当第二种 Agent 开始替代第一种 Agent 在社会模拟中的角色时，一个根本性的范式转变正在发生。本文系统梳理这一转变的技术景观、核心项目、方法论挑战和应用前景，并尝试回答一个关键问题：**LLM 驱动的 Agent 是否真正解决了传统 ABM 的核心困境，还是只是换了一种方式重现了相同的问题？**

---

## 二、传统 ABM 的核心困境

### 2.1 微观-宏观断裂

ABM 的核心承诺是**从微观行为规则涌现宏观社会模式**。Epstein 将此称为「生成式解释」（generative explanation）<sup>[4]</sup>：如果你能从简单规则中「种出」一个宏观现象，那你就在某种意义上「理解」了它。

但这个承诺面临一个根本性的困难：**人类行为不遵循简单规则。** 传统 ABM 中的 Agent 使用 if-then 逻辑、效用函数或强化学习策略来做决策。这些规则是研究者根据理论假设硬编码的——这意味着涌现的宏观模式在很大程度上是由研究者的先验假设预先决定的，而非真正「涌现」的。

Gilbert 和 Troitzsch（2005）在其经典教材中坦承了这个矛盾<sup>[5]</sup>：ABM 的力量在于涌现，但涌现的前提是微观规则的正确性——而我们通常无法验证微观规则是否正确。

### 2.2 行为丰富性的缺失

考虑一个经典的例子：Schelling 隔离模型<sup>[1]</sup>。每个 Agent 只有一个参数——对同类邻居比例的容忍阈值。当阈值超过约 30% 时，完全隔离的空间模式涌现。

这个模型优雅地展示了微观偏好如何导致宏观隔离。但现实中，人类选择居住地的决策涉及收入、学区质量、通勤距离、社会网络、文化偏好、房产投资预期、对犯罪率的感知——以及这些因素之间复杂的、因人而异的权衡。一个单一阈值参数无法捕捉这种丰富性。

Macy 和 Willer（2002）在 *Annual Review of Sociology* 的综述中指出<sup>[6]</sup>：ABM 在社会科学中的采纳率远低于预期，核心原因之一是**行为规则过于简化**，导致模型结论缺乏对复杂现实的说服力。

### 2.3 验证的困境

2025 年的一项系统综述（209 篇论文）将验证定义为 ABM 和 GABM（Generative Agent-Based Modeling）的**核心未解问题**<sup>[7]</sup>。传统 ABM 的验证方法——参数扫描、敏感性分析、与经验数据的宏观模式匹配——在微观层面上是不充分的，因为宏观模式匹配不能证明微观规则正确（等效性问题，equifinality）。

---

## 三、LLM 驱动的 GABM：范式跃迁

### 3.1 Generative Agents：开创性实验

2023 年 4 月，Joon Sung Park 等人在 Stanford 发表了 *Generative Agents: Interactive Simulacra of Human Behavior*<sup>[3]</sup>——这篇论文重新定义了社会模拟的可能性。

25 个 LLM 驱动的 Agent 被放置在一个名为 Smallville 的虚拟小镇中。每个 Agent 有名字、职业、人际关系和个人目标。它们醒来、做早餐、去上班、在咖啡馆闲聊、形成关于邻居的看法、制定周末计划。当研究者给其中一个 Agent 输入「你想举办一个情人节派对」的种子指令时，这个 Agent 自主地——没有任何额外编程——邀请了其他 Agent，其他 Agent 各自决定是否参加，形成了一个自发组织的社交活动。

架构的核心是三个组件：
- **记忆流**（Memory Stream）：存储 Agent 的所有经历，以自然语言描述
- **反思**（Reflection）：定期从记忆中提取高层次的洞见（「我最近和 John 的关系变得紧张了」）
- **规划**（Planning）：基于记忆和反思制定日程和行动计划

### 3.2 从 25 人到 1000 人：规模化验证

2024 年 11 月，同一团队发表了更具野心的后续工作：*Generative Agent Simulations of 1,000 People*<sup>[8]</sup>。

他们对 1,052 名真实个体进行了 2 小时的深度定性访谈，然后基于访谈数据创建了每个人的 LLM Agent 分身。关键发现：

| 指标 | Agent 复现准确率 | 真人两周后复现准确率 |
|------|----------------|-------------------|
| 一般社会调查（GSS）回答 | **85%** | 100%（基线） |
| 态度量表一致性 | 0.85 | 1.00 |
| 跨种族/意识形态群体偏差 | **显著降低** | — |

这意味着：**LLM Agent 对真实个体态度和行为的复现准确率，达到了该个体两周后复现自身回答准确率的 85%。** 这是一个惊人的数字——它表明 LLM Agent 不仅能模拟「平均」的人类行为，还能捕捉个体差异。

### 3.3 核心项目景观

2023-2026 年间涌现了大量 GABM 项目。以下是按规模和贡献分类的全景图：

| 项目 | 机构 | Agent 规模 | 核心贡献 | 年份 |
|------|------|-----------|---------|------|
| **Generative Agents** | Stanford | 25 | 记忆-反思-规划架构 | 2023 |
| **CAMEL** | KAUST | 2+ | 角色扮演多 Agent 框架 (NeurIPS) | 2023 |
| **Concordia** | DeepMind | 10-100 | Game Master 架构，NeurIPS Contest | 2023 |
| **S³** | Tsinghua | 数百 | 社交网络模拟系统 | 2023 |
| **EconAgent** | Tsinghua | 数百 | 宏观经济模拟 (ACL 2024) | 2024 |
| **Project Sid** | — | 10-1000+ | Minecraft 文明涌现 | 2024 |
| **1,000 People** | Stanford | 1,052 | 真实个体复现 | 2024 |
| **OASIS** | CAMEL-AI | **100 万** | 社交媒体群体极化 | 2024 |
| **AgentSociety** | Tsinghua | **1 万+** | 500 万次交互，政策模拟 | 2025 |
| **AgentTorch** | MIT Media Lab | **840 万** | 纽约 COVID-19 数字孪生 (AAMAS) | 2025 |

从 25 到 840 万——两年内规模增长了 6 个数量级。

---

## 四、关键应用领域

![GABM Application Domains]({{ '/assets/images/abm-application-domains.svg' | relative_url }})

### 4.1 流行病学

MIT Media Lab 的 AgentTorch<sup>[9]</sup> 是目前规模最大的 GABM 应用。它模拟了纽约市 840 万居民的 COVID-19 传播动态，每个 Agent 的行为由 LLM 驱动。核心创新是**「LLM 原型」（LLM Archetypes）**——认识到百万级模拟需要的是规模而非个体精细度，因此将具有相似人口统计特征的 Agent 聚类，共享同一个 LLM 行为模板。

更引人注目的是其实际政策应用：AgentTorch 已与新西兰环境科学研究所（ESR）合作，为新西兰 500 万公民构建 H5N1 禽流感应对的数字孪生<sup>[9]</sup>。

### 4.2 经济建模

清华大学的 EconAgent<sup>[10]</sup>（ACL 2024）展示了 LLM Agent 在宏观经济模拟中的潜力。Agent 的人口统计特征镜像美国人口分布，通过感知和记忆模块模拟工作/消费决策。关键发现：LLM Agent 产生的宏观经济现象（如收入分布、消费模式）比基于规则或强化学习的 Agent 更接近现实。

AgentSociety<sup>[11]</sup>（Tsinghua, 2025）更进一步：超过 1 万个 Agent 进行了 500 万次交互，模拟就业、消费、社交和流动性。研究者用它测试了全民基本收入（UBI）政策的影响——这类政策实验在现实中几乎不可能进行。

### 4.3 政治极化与信息传播

OASIS<sup>[12]</sup>（CAMEL-AI, 2024）模拟了多达 100 万个社交媒体用户在类 Twitter 和类 Reddit 平台上的行为，成功复现了信息传播、群体极化和羊群效应。FlockVote<sup>[13]</sup> 则用 1,000 个 Agent 模拟了 2024 年美国总统大选中七个摇摆州的投票动态。

COLING 2025 的一项研究<sup>[14]</sup>用 LLM 驱动的模拟展示了推荐算法如何创造信息茧房——这种因果推断在现实社交媒体数据中几乎不可能实现。

### 4.4 社会规范涌现

IJCAI 2024 的研究<sup>[15]</sup>展示了社会规范如何在 LLM Agent 社区中自发涌现：没有任何显式编程，Agent 通过反复交互自主发展出合作规范、惩罚机制和共享价值观。2024 年 12 月的一项研究<sup>[16]</sup>进一步发现，Agent 的个体性格特征也能通过社会交互自发分化——这暗示了「社会塑造个体」这一社会学核心命题的计算验证。

---

## 五、传统平台 vs. LLM 增强：技术景观

| 平台 | 语言 | 优势 | LLM 集成 |
|------|------|------|---------|
| **NetLogo** | NetLogo | 最广泛采用，教学友好 | NetLogo Chat (CHI 2024) 辅助建模 |
| **Mesa** | Python | Python 生态，v3.2 集成 LLM | 2025 Google SoC 项目 |
| **MASON** | Java | 高可扩展性 | 无原生支持 |
| **Repast** | Java/C++ | 大规模模拟 | 无原生支持 |
| **Agents.jl** | Julia | 高性能 | 无原生支持 |
| **Concordia** | Python | 专为 GABM 设计 | 原生 LLM 驱动 |
| **AgentTorch** | Python/PyTorch | 百万级可扩展 | 原生 LLM 原型 |

一个关键趋势是 Mesa 3.2（2025）——最流行的 Python ABM 框架——将 LLM 作为 Agent 行为的**一等公民**集成<sup>[17]</sup>。这标志着 GABM 从实验性项目向主流工具链的转变。

---

## 六、经典模型的 LLM 升级

![Classic Models LLM Upgrade]({{ '/assets/images/abm-classic-models-upgrade.svg' | relative_url }})

传统 ABM 中的经典模型正在被 LLM 重新诠释：

| 经典模型 | 传统规则 | LLM 升级 | 新增维度 |
|---------|---------|---------|---------|
| **Schelling 隔离** | 单一容忍阈值 | 自然语言推理居住偏好 | 收入、学区、社交网络的定性权衡 |
| **Sugarscape** | 采集-消费-繁殖 | LLM 驱动的生存策略 | 2025 研究发现攻击行为自发涌现<sup>[18]</sup> |
| **Axelrod 文化模型** | 二值特征匹配 | 自然语言文化交流 | 语义层面的文化融合与冲突 |
| **囚徒困境** | 固定策略（TFT 等） | 自然语言协商 | Concordia 比赛已实现<sup>[19]</sup> |
| **El Farol 酒吧** | 归纳推理 | LLM 推理协调 | 无需显式博弈论策略 |
| **选民模型** | 概率模仿 | 论据驱动的态度转变 | FlockVote 已验证<sup>[13]</sup> |

2025 年的 Sugarscape-LLM 研究<sup>[18]</sup>特别引人注目：在没有任何显式编程的情况下，LLM Agent 在资源极度匮乏时的攻击率超过 **80%**——跨 GPT-4o、Gemini-2.5-Pro 和 Gemini-2.5-Flash 模型一致出现。这是「生存本能」的涌现，还是训练数据中生存叙事的复现？这个问题直指 GABM 的核心认识论挑战。

---

## 七、方法论挑战：诚实的审视

### 7.1 验证：核心未解问题

2025 年的 209 篇论文系统综述<sup>[7]</sup>的结论毫不含糊：**验证是 GABM 的核心挑战。** 传统 ABM 的验证框架采纳率就很低，LLM 的黑箱性质使问题更加严重。当一个 LLM Agent 做出决策时，我们无法像检查 if-then 规则那样审查其推理过程。

### 7.2 涌现 vs. 复现：认识论的根本困境

这是 GABM 最深层的方法论问题：我们观察到的行为是从模拟动力学中真正**涌现**的，还是 LLM 从训练数据中**复现**的？

如果 LLM Agent 在 Sugarscape 中展示了「攻击行为」，这可能是：
- **涌现**：Agent 在资源约束下通过推理发现了攻击是最优策略
- **复现**：LLM 在训练数据中见过大量「资源匮乏→冲突」的叙事模式

这个区分至关重要——因为涌现意味着我们发现了新知识，而复现只是在重放旧知识。

### 7.3 可重复性

LLM 是随机的——相同的输入可能产生不同的输出。温度设置、模型版本、API 更新都会影响结果。2024 年 1 月用 GPT-4 运行的模拟，2025 年 6 月用 GPT-4o 可能产生完全不同的结果。目前没有标准化的可重复性协议。

2026 年 2 月的一项研究尝试用 ODD（Overview, Design concepts, Details）协议——传统 ABM 的标准文档格式——来规范 LLM 的 ABM 复现<sup>[20]</sup>，但这只是起步。

### 7.4 成本与规模的矛盾

百万级 Agent 模拟需要百万级 LLM API 调用——成本惊人。AgentTorch 的「LLM 原型」方法<sup>[9]</sup>认识到**群体模拟需要的是规模而非个体精细度**，将相似 Agent 聚类共享行为模板。OASIS<sup>[12]</sup> 和 AgentSociety<sup>[11]</sup> 使用了各种优化策略。但成本仍然是推广的主要障碍。

### 7.5 偏见与代表性

LLM 倾向于产生**夸大的刻板印象**而非准确的社会群体表征。Park 等人的 1,000 人研究<sup>[8]</sup>专门测量并减少了跨种族和意识形态群体的准确性偏差，但这仍然是一个活跃的研究前线。

---

## 八、与 CivAgent 的连接：制度作为 GABM 的编排层

本系列此前的文章提出了一个核心论点：**人类政治制度是经过千年验证的 Agent 编排设计模式库**。这个论点在 GABM 的语境下获得了新的意义。

传统 ABM 的 Agent 编排是固定的——研究者预先定义了 Agent 之间的交互拓扑。但 GABM 的 Agent 可以用自然语言协商、形成联盟、建立层级——它们可以自主发展出治理结构。

CivAgent 的 57 种政体可以作为 GABM 的**初始制度条件**：

| GABM 研究问题 | CivAgent 编排模式 | 实验设计 |
|-------------|-----------------|---------|
| 不同治理结构下的公共物品博弈 | 集权 vs 民主 vs 联邦 | 比较合作率和资源效率 |
| 信息传播与审核机制 | 唐制衡 vs 秦集权 | 比较信息质量和传播速度 |
| 危机响应效率 | 波斯联邦 vs 罗马集权 | 比较响应延迟和适应性 |
| 制度涌现 | 无初始制度 | 观察 Agent 自发发展出哪种治理结构 |

最后一行尤其令人兴奋：如果 1,000 个 LLM Agent 在没有任何制度预设的情况下自发发展出类似历史政体的治理结构，这将是对制度演化理论的强力计算验证。Project Sid<sup>[21]</sup> 在 Minecraft 中已经观察到了 Agent 自主发展专业角色和集体规则的现象。

---

## 九、研究前沿与机构景观

### 关键研究者和实验室

| 研究者/实验室 | 机构 | 核心贡献 |
|-------------|------|---------|
| **Joon Sung Park** | Stanford → Simile AI | Generative Agents, 1,000 People |
| **Michael Bernstein, Percy Liang** | Stanford HAI | 生成式 Agent 联合 PI |
| **Robb Willer** | Stanford 社会学系 | 社会行为建模 |
| **陈高、高一凡等** | 清华 FIB Lab | S³, EconAgent, AgentSociety |
| **Ayush Chopra** | MIT Media Lab | AgentTorch, AAMAS 2025 Oral |
| **Navid Ghaffarzadegan** | Virginia Tech | GABM 教程，流行病建模 |
| **DeepMind 团队** | Google DeepMind | Concordia, NeurIPS Contest |
| **CAMEL-AI 团队** | KAUST | CAMEL, OASIS 百万 Agent |

### 学术平台与会议

- **CIKM 2024**：首届「LLM Agents for Social Simulation」Workshop<sup>[22]</sup>
- **AAMAS 2025**：AgentTorch 被接收为 Oral
- **Santa Fe Institute**：CSS 2024/2025 会议，复杂系统的发源地
- **JASSS**：传统 ABM 旗舰期刊，正在接收 LLM 集成的投稿
- **CSSSA**：计算社会科学学会年会

---

## 十、展望：三个未解的大问题

**第一，验证方法论。** GABM 需要一套全新的验证框架——既不是传统 ABM 的参数扫描，也不是 LLM 的 benchmark 测试。Park 等人的 1,000 人研究<sup>[8]</sup>开创了一条路径：用真实个体的访谈数据校准 Agent，然后用独立的调查数据验证。但这种方法的成本极高，且仅适用于个体层面，不能直接验证宏观涌现。

**第二，涌现 vs. 复现的判定标准。** 我们需要一套形式化的标准来区分「LLM Agent 发现了新的社会动力学」和「LLM Agent 复现了训练数据中的社会学教科书」。这是一个深刻的认识论问题，可能需要借鉴因果推断和反事实推理的方法。

**第三，制度设计的计算验证。** 如果我们能在 GABM 中重现钱穆发现的「制度迭代演化」模式——让 Agent 社会从集权走向制衡、从制衡走向联邦、每一次转变都回应前一阶段的内生矛盾——这将不仅是计算社会科学的突破，也是对历史学方法论的有力支撑。

---

**这是一个激动人心的时刻。** 两个长期独立发展的「Agent」传统——计算社会科学的 ABM 和人工智能的 LLM Agent——正在以一种前所未有的方式汇合。这种汇合不仅带来了技术上的可能性，也带来了深刻的认识论挑战。但正如 Epstein 所说：如果你不能成长它，你就不能理解它。而 LLM Agent 给了我们前所未有的能力去「成长」复杂的社会系统。

---

## 参考文献

<small>

[1] Schelling, T. C. (1971). "Dynamic Models of Segregation." *Journal of Mathematical Sociology*, 1(2), 143-186.

[2] Epstein, J. M. & Axtell, R. (1996). *Growing Artificial Societies: Social Science from the Bottom Up*. Washington, D.C.: Brookings Institution Press.

[3] Park, J. S., O'Brien, J. C., Cai, C. J., Morris, M. R., Liang, P., & Bernstein, M. S. (2023). "Generative Agents: Interactive Simulacra of Human Behavior." *Proceedings of UIST '23*. arXiv:2304.03442.

[4] Epstein, J. M. (1999). "Agent-Based Computational Models and Generative Social Science." *Complexity*, 4(5), 41-60.

[5] Gilbert, N. & Troitzsch, K. G. (2005). *Simulation for the Social Scientist* (2nd ed.). Maidenhead: Open University Press.

[6] Macy, M. W. & Willer, R. (2002). "From Factors to Actors: Computational Sociology and Agent-Based Modeling." *Annual Review of Sociology*, 28, 143-166.

[7] "Validation is the central challenge for generative social simulation: a critical review of LLMs in agent-based modeling." *Artificial Intelligence Review*, Springer, 2025. 209 papers systematic review.

[8] Park, J. S. et al. (2024). "Generative Agent Simulations of 1,000 People." arXiv:2411.10109.

[9] Chopra, A. et al. (2025). "On the limits of agency in agent-based models." *AAMAS 2025* (Oral). MIT Media Lab AgentTorch.

[10] Li, N. et al. (2024). "EconAgent: Large Language Model-Empowered Agents for Simulating Macroeconomic Activities." *ACL 2024*.

[11] Piao, J. et al. (2025). "AgentSociety: Large-Scale Simulation of LLM-Driven Generative Agents Advances Understanding of Human Behaviors and Society." arXiv:2502.08691.

[12] "OASIS: Open Agent Social Interaction Simulations with One Million Agents." CAMEL-AI, 2024. arXiv:2411.11581.

[13] "FlockVote: 1,000 LLM Agents Simulating the 2024 Presidential Election in Seven U.S. Swing States." 2024. arXiv:2512.05982.

[14] "Decoding Echo Chambers." *COLING 2025*.

[15] "Emergence of Social Norms in Generative Agent Societies." *IJCAI 2024*.

[16] "Spontaneous Emergence of Agent Individuality Through Social Interactions in LLM-Based Communities." December 2024. PMC.

[17] Mesa 3.2 (2025). *Journal of Open Source Software*. LLM integration via Google Summer of Code.

[18] "Sugarscape-LLM: LLM Agents Display Survival Instincts." 2025. arXiv:2508.12920.

[19] "Concordia: Generative agent-based modeling with actions grounded in physical, social, or digital space." Google DeepMind, 2023. arXiv:2312.03664. NeurIPS 2024 Contest.

[20] "Can Large Language Models Implement Agent-Based Models? An ODD-based Replication Study." February 2026. arXiv:2602.10140.

[21] "Project Sid: Many-agent simulations toward AI civilization." 2024. arXiv:2411.00114.

[22] "The 1st Workshop on LLM Agents for Social Simulation." *CIKM 2024*. ACM.

</small>

</div>

<div class="lang-en" markdown="1">

> *"If you didn't grow it, you didn't explain it."*
> *— Joshua Epstein, "Growing Artificial Societies"*

---

## I. Introduction: The Historical Convergence of Two "Agents"

![ABM Paradigm Shift]({{ '/assets/images/abm-paradigm-shift.svg' | relative_url }})

A nominative coincidence within computational social science is evolving into a profound disciplinary fusion.

The **"Agent"** in Agent-Based Modeling (ABM)---since Schelling's (1971) segregation model<sup>[1]</sup> and Epstein & Axtell's (1996) Sugarscape<sup>[2]</sup>---denotes computational entities following simple rules, producing emergent macro-patterns through local interactions. These agents possess no language ability, no memory, no reasoning---they are mathematical functions incarnate.

The **"Agent"** in AI---since Stanford's 2023 Generative Agents<sup>[3]</sup>---denotes autonomous entities powered by large language models (LLMs) that communicate in natural language, maintain episodic memory, engage in reflective reasoning, and formulate and execute plans.

When the second type of agent begins replacing the first in social simulations, a fundamental paradigm shift is underway. This essay systematically surveys the technical landscape, core projects, methodological challenges, and application prospects of this transformation, while attempting to answer a key question: **Do LLM-driven agents truly solve ABM's core dilemmas, or do they merely reproduce the same problems in a different guise?**

---

## II. The Core Dilemmas of Traditional ABM

### 2.1 The Micro-Macro Disconnect

ABM's central promise is **the emergence of macro-level social patterns from micro-level behavioral rules**. Epstein called this "generative explanation"<sup>[4]</sup>: if you can "grow" a macro-phenomenon from simple rules, you have in some sense "explained" it.

But this promise faces a fundamental difficulty: **human behavior does not follow simple rules.** Agents in traditional ABMs use if-then logic, utility functions, or reinforcement learning policies. These rules are hardcoded by researchers based on theoretical assumptions---meaning emergent macro-patterns are largely predetermined by the researcher's prior assumptions rather than genuinely "emergent."

Gilbert and Troitzsch (2005) candidly acknowledged this tension<sup>[5]</sup>: ABM's power lies in emergence, yet emergence presupposes the correctness of micro-rules---which we typically cannot verify.

### 2.2 Behavioral Poverty

Consider the classic example: Schelling's segregation model<sup>[1]</sup>. Each agent has a single parameter---a tolerance threshold for the proportion of same-type neighbors. When the threshold exceeds approximately 30%, fully segregated spatial patterns emerge.

The model elegantly demonstrates how micro-preferences produce macro-segregation. But in reality, residential choices involve income, school quality, commute distance, social networks, cultural preferences, real estate investment expectations, perceptions of crime rates---and complex, person-specific trade-offs among these factors. A single threshold parameter cannot capture this richness.

Macy and Willer (2002), in their *Annual Review of Sociology* survey, noted<sup>[6]</sup> that ABM adoption in social science has fallen far short of expectations, with a core reason being **oversimplified behavioral rules** that undermine the persuasiveness of model conclusions.

### 2.3 The Validation Impasse

A 2025 systematic review of 209 papers defined validation as the **central unsolved problem** for both ABM and GABM<sup>[7]</sup>. Traditional ABM validation methods---parameter sweeps, sensitivity analysis, macro-pattern matching against empirical data---are insufficient at the micro level because macro-pattern matching cannot prove micro-rule correctness (the equifinality problem).

---

## III. LLM-Driven GABM: The Paradigm Shift

### 3.1 Generative Agents: The Foundational Experiment

In April 2023, Joon Sung Park et al. at Stanford published *Generative Agents: Interactive Simulacra of Human Behavior*<sup>[3]</sup>---a paper that redefined the possibilities of social simulation.

Twenty-five LLM-powered agents were placed in a virtual town called Smallville. Each had a name, occupation, relationships, and personal goals. They woke up, made breakfast, went to work, chatted at coffee shops, formed opinions about neighbors, and made weekend plans. When researchers seeded one agent with "you want to throw a Valentine's Day party," that agent autonomously---without any additional programming---invited other agents, who independently decided whether to attend, forming a self-organized social event.

The architecture centers on three components:
- **Memory Stream**: Stores all agent experiences as natural-language descriptions
- **Reflection**: Periodically extracts higher-level insights from memory ("My relationship with John has become tense lately")
- **Planning**: Formulates schedules and action plans based on memory and reflections

### 3.2 From 25 to 1,000: Scaled Validation

In November 2024, the same team published a more ambitious follow-up: *Generative Agent Simulations of 1,000 People*<sup>[8]</sup>.

They conducted 2-hour qualitative interviews with 1,052 real individuals, then created LLM agent replicas of each person. Key finding:

| Metric | Agent Replication Accuracy | Human Self-Replication (2 weeks later) |
|--------|--------------------------|---------------------------------------|
| GSS Response Match | **85%** | 100% (baseline) |
| Attitude Scale Consistency | 0.85 | 1.00 |
| Cross-racial/ideological Bias | **Significantly reduced** | --- |

This means LLM agents replicated real individuals' attitudes and behaviors at **85% of the accuracy** with which those individuals replicated their own responses two weeks later---demonstrating that LLM agents can capture individual differences, not just average human behavior.

### 3.3 The Project Landscape

The 2023--2026 period has produced a rich ecosystem of GABM projects:

| Project | Institution | Agent Scale | Core Contribution | Year |
|---------|-------------|-------------|-------------------|------|
| **Generative Agents** | Stanford | 25 | Memory-reflection-planning architecture | 2023 |
| **CAMEL** | KAUST | 2+ | Role-playing multi-agent framework (NeurIPS) | 2023 |
| **Concordia** | DeepMind | 10--100 | Game Master architecture, NeurIPS Contest | 2023 |
| **S³** | Tsinghua | Hundreds | Social network simulation system | 2023 |
| **EconAgent** | Tsinghua | Hundreds | Macroeconomic simulation (ACL 2024) | 2024 |
| **Project Sid** | --- | 10--1,000+ | Civilization emergence in Minecraft | 2024 |
| **1,000 People** | Stanford | 1,052 | Real individual replication | 2024 |
| **OASIS** | CAMEL-AI | **1 million** | Social media group polarization | 2024 |
| **AgentSociety** | Tsinghua | **10,000+** | 5 million interactions, policy simulation | 2025 |
| **AgentTorch** | MIT Media Lab | **8.4 million** | NYC COVID-19 digital twin (AAMAS) | 2025 |

From 25 to 8.4 million---six orders of magnitude in two years.

---

## IV. Key Application Domains

![GABM Application Domains]({{ '/assets/images/abm-application-domains.svg' | relative_url }})

### 4.1 Epidemiology

MIT Media Lab's AgentTorch<sup>[9]</sup> is the largest GABM application to date: 8.4 million agents simulating COVID-19 dynamics across New York City, each agent's behavior driven by an LLM. The key innovation is **"LLM Archetypes"**---recognizing that population-scale simulation prioritizes scale over individual granularity, clustering agents with similar demographics to share behavioral templates.

Remarkably, AgentTorch has partnered with New Zealand's Institute of Environmental Science and Research (ESR) to build a 5-million-citizen digital twin for H5N1 avian influenza response<sup>[9]</sup>.

### 4.2 Economic Modeling

Tsinghua's EconAgent<sup>[10]</sup> (ACL 2024) demonstrated LLM agents' potential in macroeconomic simulation. Agent demographics mirror the U.S. population; perception and memory modules drive work/consumption decisions. Key finding: LLM agents produce macroeconomic phenomena (income distribution, consumption patterns) closer to reality than rule-based or RL agents.

AgentSociety<sup>[11]</sup> (Tsinghua, 2025) goes further: 10,000+ agents with 5 million interactions simulating employment, consumption, social behavior, and mobility. Researchers used it to test Universal Basic Income (UBI) policy impacts---experiments virtually impossible in reality.

### 4.3 Political Polarization and Information Propagation

OASIS<sup>[12]</sup> (CAMEL-AI, 2024) simulated up to 1 million social media users on Twitter-like and Reddit-like platforms, successfully replicating information spreading, group polarization, and herd effects. FlockVote<sup>[13]</sup> simulated 1,000 agents modeling voting dynamics across seven U.S. swing states in the 2024 presidential election.

A COLING 2025 study<sup>[14]</sup> used LLM-driven simulations to demonstrate how recommendation algorithms create echo chambers---causal inference virtually impossible with real social media data.

### 4.4 Social Norm Emergence

IJCAI 2024 research<sup>[15]</sup> demonstrated social norms emerging spontaneously in LLM agent communities: without any explicit programming, agents autonomously developed cooperation norms, punishment mechanisms, and shared values through repeated interactions. A December 2024 study<sup>[16]</sup> further found that individual personality traits differentiated spontaneously through social interaction---suggesting computational validation of the sociological core thesis that "society shapes the individual."

---

## V. Traditional Platforms vs. LLM-Augmented: The Technical Landscape

| Platform | Language | Strengths | LLM Integration |
|----------|----------|-----------|-----------------|
| **NetLogo** | NetLogo | Most widely adopted, educational | NetLogo Chat (CHI 2024) assists modeling |
| **Mesa** | Python | Python ecosystem, v3.2 integrates LLM | 2025 Google SoC project |
| **MASON** | Java | High scalability | No native support |
| **Repast** | Java/C++ | Large-scale simulations | No native support |
| **Agents.jl** | Julia | High performance | No native support |
| **Concordia** | Python | Purpose-built for GABM | Native LLM-driven |
| **AgentTorch** | Python/PyTorch | Million-scale | Native LLM archetypes |

A key milestone is Mesa 3.2 (2025)---the most popular Python ABM framework---integrating LLMs as a **first-class citizen** for agent behavior<sup>[17]</sup>. This signals the transition from experimental projects to mainstream tooling.

---

## VI. Classic Models Upgraded by LLMs

![Classic Models LLM Upgrade]({{ '/assets/images/abm-classic-models-upgrade.svg' | relative_url }})

Traditional ABM classics are being reinterpreted through LLMs:

| Classic Model | Traditional Rules | LLM Upgrade | New Dimensions |
|--------------|-------------------|-------------|----------------|
| **Schelling Segregation** | Single tolerance threshold | Natural-language reasoning about residential preferences | Qualitative trade-offs across income, schools, social networks |
| **Sugarscape** | Gather-consume-reproduce | LLM-driven survival strategies | 2025 study: aggressive behavior emerges spontaneously<sup>[18]</sup> |
| **Axelrod Culture Model** | Binary feature matching | Natural-language cultural exchange | Semantic-level cultural fusion and conflict |
| **Prisoner's Dilemma** | Fixed strategies (TFT, etc.) | Natural-language negotiation | Concordia contest implemented this<sup>[19]</sup> |
| **El Farol Bar** | Inductive reasoning | LLM coordination reasoning | No explicit game-theoretic strategies needed |
| **Voter Model** | Probabilistic imitation | Argument-driven attitude change | FlockVote validated<sup>[13]</sup> |

The 2025 Sugarscape-LLM study<sup>[18]</sup> is particularly striking: without any explicit programming, LLM agents' attack rates under extreme resource scarcity exceeded **80%**---consistent across GPT-4o, Gemini-2.5-Pro, and Gemini-2.5-Flash. Is this "emergence" of survival instinct, or "reproduction" of survival narratives from training data? This question strikes at the epistemological heart of GABM.

---

## VII. Methodological Challenges: An Honest Appraisal

### 7.1 Validation: The Core Unsolved Problem

The 2025 systematic review of 209 papers<sup>[7]</sup> is unequivocal: **validation is the central challenge of GABM.** Traditional ABM validation frameworks already saw limited uptake; LLMs' black-box nature exacerbates the problem.

### 7.2 Emergence vs. Reproduction: The Fundamental Epistemological Dilemma

This is GABM's deepest methodological question: are the behaviors we observe genuinely **emergent** from simulation dynamics, or **reproduced** from the LLM's training data?

If an LLM agent in Sugarscape exhibits "attack behavior," this could be:
- **Emergence**: The agent discovered through reasoning that attack is optimal under resource constraints
- **Reproduction**: The LLM has encountered abundant "resource scarcity → conflict" narrative patterns in training data

The distinction is crucial: emergence means we have discovered new knowledge; reproduction merely replays old knowledge.

### 7.3 Reproducibility

LLMs are stochastic---identical inputs may yield different outputs. Temperature settings, model versions, and API changes all affect results. A February 2026 study attempted to standardize ABM documentation for LLMs using the ODD (Overview, Design concepts, Details) protocol<sup>[20]</sup>, but this is only a beginning.

### 7.4 Cost vs. Scale

Million-agent simulations require million-scale LLM API calls. AgentTorch's "LLM Archetypes"<sup>[9]</sup> clusters similar agents to share behavioral templates. OASIS<sup>[12]</sup> and AgentSociety<sup>[11]</sup> use various optimization strategies. But cost remains the primary barrier to adoption.

### 7.5 Bias and Representation

LLMs tend toward **exaggerated stereotypes** rather than accurate social group representations. Park et al.'s 1,000-person study<sup>[8]</sup> specifically measured and reduced accuracy biases across racial and ideological groups, but this remains an active research frontier.

---

## VIII. Connection to CivAgent: Institutions as the Orchestration Layer for GABM

Previous essays in this series argued that **human political institutions are a millennium-tested design pattern library for agent orchestration.** This argument acquires new significance in the GABM context.

Traditional ABM agent orchestration is fixed---researchers predefine interaction topology. But GABM agents can negotiate in natural language, form coalitions, establish hierarchies---they can autonomously develop governance structures.

CivAgent's 57 polities can serve as **initial institutional conditions** for GABM:

| GABM Research Question | CivAgent Mode | Experimental Design |
|----------------------|---------------|-------------------|
| Public goods games under different governance | Centralized vs. Democratic vs. Federal | Compare cooperation rates and resource efficiency |
| Information propagation with review mechanisms | Tang checks vs. Qin centralization | Compare information quality and propagation speed |
| Crisis response efficiency | Persian federation vs. Roman centralization | Compare response latency and adaptability |
| Institutional emergence | No initial institutions | Observe which governance structures agents spontaneously develop |

The last row is especially exciting: if 1,000 LLM agents spontaneously develop governance structures resembling historical polities without any institutional presets, this would constitute a powerful computational validation of institutional evolution theory. Project Sid<sup>[21]</sup> in Minecraft has already observed agents autonomously developing specialized roles and collective rules.

---

## IX. The Research Frontier

### Key Researchers and Labs

| Researcher/Lab | Affiliation | Core Contributions |
|---------------|-------------|-------------------|
| **Joon Sung Park** | Stanford → Simile AI | Generative Agents, 1,000 People |
| **Michael Bernstein, Percy Liang** | Stanford HAI | Generative agents co-PIs |
| **Robb Willer** | Stanford Sociology | Social behavior modeling |
| **Chen Gao, Yifan Gao et al.** | Tsinghua FIB Lab | S³, EconAgent, AgentSociety |
| **Ayush Chopra** | MIT Media Lab | AgentTorch, AAMAS 2025 Oral |
| **Navid Ghaffarzadegan** | Virginia Tech | GABM tutorial, epidemic modeling |
| **DeepMind team** | Google DeepMind | Concordia, NeurIPS Contest |
| **CAMEL-AI team** | KAUST | CAMEL, OASIS million-agent simulation |

### Academic Venues

- **CIKM 2024**: 1st Workshop on LLM Agents for Social Simulation<sup>[22]</sup>
- **AAMAS 2025**: AgentTorch accepted as Oral presentation
- **Santa Fe Institute**: CSS 2024/2025 conferences, birthplace of complexity science
- **JASSS**: Flagship ABM journal, now accepting LLM integration submissions
- **CSSSA**: Computational Social Science Society of the Americas annual conference

---

## X. Outlook: Three Unresolved Grand Questions

**First, validation methodology.** GABM needs an entirely new validation framework---neither traditional ABM parameter sweeps nor LLM benchmarks. Park et al.'s 1,000-person study<sup>[8]</sup> pioneered one path: calibrating agents from real individual interviews and validating against independent survey data. But this approach is extremely costly and operates only at the individual level.

**Second, criteria for distinguishing emergence from reproduction.** We need formalized criteria to distinguish "an LLM agent discovered new social dynamics" from "an LLM agent reproduced sociology textbooks from its training data." This profound epistemological question may require methods borrowed from causal inference and counterfactual reasoning.

**Third, computational validation of institutional design.** If we can reproduce in GABM the "iterative institutional evolution" pattern that Qian Mu identified---letting agent societies progress from centralization to checks and balances, from checks and balances to federation, each transition responding to the endogenous contradictions of the previous stage---this would represent not only a breakthrough in computational social science but a powerful endorsement of historiographical methodology.

---

**This is an exhilarating moment.** Two long-independent "Agent" traditions---computational social science's ABM and artificial intelligence's LLM agents---are converging in an unprecedented way. This convergence brings not only technological possibilities but profound epistemological challenges. But as Epstein said: if you didn't grow it, you didn't explain it. And LLM agents give us unprecedented power to "grow" complex social systems.

---

## References

<small>

[1] Schelling, T. C. (1971). "Dynamic Models of Segregation." *Journal of Mathematical Sociology*, 1(2), 143-186.

[2] Epstein, J. M. & Axtell, R. (1996). *Growing Artificial Societies: Social Science from the Bottom Up*. Washington, D.C.: Brookings Institution Press.

[3] Park, J. S., O'Brien, J. C., Cai, C. J., Morris, M. R., Liang, P., & Bernstein, M. S. (2023). "Generative Agents: Interactive Simulacra of Human Behavior." *Proceedings of UIST '23*. arXiv:2304.03442.

[4] Epstein, J. M. (1999). "Agent-Based Computational Models and Generative Social Science." *Complexity*, 4(5), 41-60.

[5] Gilbert, N. & Troitzsch, K. G. (2005). *Simulation for the Social Scientist* (2nd ed.). Maidenhead: Open University Press.

[6] Macy, M. W. & Willer, R. (2002). "From Factors to Actors: Computational Sociology and Agent-Based Modeling." *Annual Review of Sociology*, 28, 143-166.

[7] "Validation is the central challenge for generative social simulation." *Artificial Intelligence Review*, Springer, 2025.

[8] Park, J. S. et al. (2024). "Generative Agent Simulations of 1,000 People." arXiv:2411.10109.

[9] Chopra, A. et al. (2025). "On the limits of agency in agent-based models." *AAMAS 2025* (Oral). MIT Media Lab.

[10] Li, N. et al. (2024). "EconAgent." *ACL 2024*.

[11] Piao, J. et al. (2025). "AgentSociety." arXiv:2502.08691.

[12] OASIS. CAMEL-AI, 2024. arXiv:2411.11581.

[13] FlockVote. 2024. arXiv:2512.05982.

[14] "Decoding Echo Chambers." *COLING 2025*.

[15] "Emergence of Social Norms in Generative Agent Societies." *IJCAI 2024*.

[16] "Spontaneous Emergence of Agent Individuality." December 2024.

[17] Mesa 3.2 (2025). *JOSS*.

[18] "Sugarscape-LLM." 2025. arXiv:2508.12920.

[19] Concordia. DeepMind, 2023. arXiv:2312.03664.

[20] "ODD-based Replication Study." February 2026. arXiv:2602.10140.

[21] "Project Sid." 2024. arXiv:2411.00114.

[22] "1st Workshop on LLM Agents for Social Simulation." *CIKM 2024*.

</small>

</div>
