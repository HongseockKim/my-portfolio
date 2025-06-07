import { useState } from 'react';
import { motion } from 'framer-motion';

const MyInfo = () => {
    const [activeTab, setActiveTab] = useState('all');
    const BASE_URL = import.meta.env.BASE_URL;
    const mySkill = [
        { name: 'JavaScript', image: `img/skilll/img_1.png`, category: 'frontend' },
        { name: 'Vue', image: `img/skilll/img_2.png`, category: 'frontend' },
        { name: 'React', image: `img/skilll/img_3.png`, category: 'frontend' },
        { name: 'CSS', image: `img/skilll/img_4.png`, category: 'frontend' },
        { name: 'SCSS', image: `img/skilll/img_5.png`, category: 'frontend' },
        { name: 'PHP', image: `img/skilll/img_6.png`, category: 'backend' },
        { name: 'Java Spring', image: `img/skilll/img_7.png`, category: 'backend' },
        { name: 'Node.js', image: `img/skilll/img_8.png`, category: 'backend' },
        { name: 'Electron', image: `img/skilll/img_9.png`, category: 'native' },
        { name: 'Flutter', image: `img/skilll/img_10.png`, category: 'native' },
        { name: 'Jenkins', image: `img/skilll/img_11.png`, category: 'devops' },
        { name: 'GitHub', image: `img/skilll/img_14.png`, category: 'git' },
        { name: 'Bitbucket', image: `img/skilll/img_15.png`, category: 'git' },
        { name: 'Sentry', image: `img/skilll/img_16.png`, category: 'monitoring' },
        { name: 'WhaTap', image: `img/skilll/img_19.png`, category: 'monitoring' },
        { name: 'Datadog', image: `img/skilll/img_18.png`, category: 'monitoring' },
    ];

    // 필터링된 스킬 목록
    const filteredSkills = activeTab === 'all'
        ? mySkill
        : mySkill.filter(skill => skill.category === activeTab);

    // 카테고리 목록
    const categories = [
        { id: 'all', name: '전체 스킬' },
        { id: 'frontend', name: '프론트엔드' },
        { id: 'backend', name: '백엔드' },
        { id: 'native', name: '네이티브' },
        { id: 'devops', name: '배포 및 운영' },
        { id: 'git', name: '형상관리' },
        { id: 'monitoring', name: '모니터링' }
    ];

    return (
        <div className='my_info_wrap'>
            <motion.div
                className='profile-header'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="profile-avatar">
                    <div className="avatar-circle">
                        {/* 프로필 이미지가 있다면 여기에 추가 */}
                        <span>JS</span>
                    </div>
                </div>
                <div className="profile-info">
                    <h1>프론트엔드 개발자</h1>
                    <p className="profile-subtitle">다양한 경험을 바탕으로 성장하는 개발자</p>
                </div>
            </motion.div>

            <motion.div
                className="info-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <div className="info-section">
                    <h2>소개</h2>
                    <p className='info'>
                        안녕하세요, 다양한 경험을 바탕으로 성장한 프론트엔드 개발자입니다.
                        메카트로닉스과를 졸업하여 밀링과 기계설계로 커리어를 시작했으며,
                        이후 언리얼 게임 배경 그래픽과 외식업 매니저 경험을 거쳐 개발 분야로 전환했습니다.
                    </p>
                    <p className='info'>
                        웹 퍼블리셔로 첫 발을 내딛고, 좋은 동료들에게 배우며 꾸준히 성장해왔습니다.
                        경력 대비 많은 기술을 접하느라 도전적이었지만, 그 과정이 값진 경험이 되었습니다.
                    </p>
                    <p className='info'>
                        물론 전문가들과 비교하면 깊이의 차이가 있지만, 항상 정답을 찾기 위해 노력했습니다.
                        얕은 지식을 이유로 포기하기보다는 도전적인 마인드로 부딪히며 경험을 쌓아왔습니다.
                    </p>
                    <p className='info'>
                        대부분의 회사에서 프론트엔드 파트 1인 개발자로 일하며, 자연스럽게 백엔드 영역까지
                        경험할 기회를 가졌습니다. 개발을 또 다른 형태의 '서비스'로 생각하는 마음가짐으로
                        이 분야를 선택했습니다.
                    </p>
                    <p className='info'>
                        제가 만든 웹, 앱, 제품이 사용자에게 편리함을 제공할 때 가장 큰 보람을 느끼며,
                        항상 사용자 경험 향상을 위해 고민하는 개발자입니다.
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="skills-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <h2>기술 스택</h2>

                <div className="skill-tabs">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={activeTab === category.id ? 'active' : ''}
                            onClick={() => setActiveTab(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <motion.ul
                    className='skills-grid'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {filteredSkills.map((skill, index) => (
                        <motion.li
                            key={index}
                            className='skill-card'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                        >
                            <div className="skill-icon">
                                <img src={skill.image} alt={skill.name} />
                            </div>
                            <span>{skill.name}</span>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    )
}

export default MyInfo